import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { DbService } from 'src/db/db.service';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ifEmpty } from 'src/helpers/ifempty';
import { CreateDiscDto } from './dto/create-disc.dto';
import { ResponseType } from 'src/types/response.type';
import { Evaluation, Prisma } from '@prisma/client';

@Injectable()
export class EvaluationService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;

  /**
   * This function creates a new evaluation, it also calculates the employee's score.
   * Each time a new evaluation is created, the employee's score is updated.
   * @param dto the data to create an evaluation
   * @param user the current user from JWT
   * @returns status code and message
   * @throws {ForbiddenException} if the user is not allowed to create an evaluation
   * @throws {BadRequestException} if the data is not valid
   */
  async create(dto: CreateEvaluationDto): Promise<ResponseType<Evaluation>> {
    try {
      await this.db.evaluation.create({
        data: {
          employee: {
            connect: {
              id: dto.employee_id,
            },
          },
          evaluator: {
            connect: {
              id: dto.evaluator_id,
            },
          },
          status: dto.status,
          period_start: dto.period_start,
          period_end: dto.period_end,
          grades: {
            create: dto.metrics.map((metric) => {
              return {
                metric: {
                  connect: {
                    id: metric.metric_id,
                  },
                },
                score: metric.score,
                employee: {
                  connect: {
                    id: dto.employee_id,
                  },
                },
              };
            }),
          },
          comments: dto.comments,
        },
      });

      //Updates the employee score
      const score = await this.db.grade.aggregate({
        where: {
          employee_id: dto.employee_id,
        },
        _avg: {
          score: true,
        },
      });
      //TODO Enquanto a avaliação nao for COMPLETADA nao atualizar
      await this.db.employee.update({
        where: {
          id: dto.employee_id,
        },
        data: {
          score: score._avg.score,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Evaluation created',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      }
      throw new ForbiddenException(e.message);
    }
  }

  /**
   * Finds all evaluations, restircited by the user's ability - SANITIZED
   * @param user the current user from JWT
   * @returns status code, message and all evaluations
   * @throws {ForbiddenException} if the user is not allowed to list all evaluations
   */
  async findAll(user: ReqUser): Promise<ResponseType<Evaluation[]>> {
    try {
      const evaluations = await this.db.evaluation.findMany({
        where: accessibleBy(this.ability(user)).Evaluation,
        include: {
          _count: {
            select: {
              grades: true,
            },
          },
          employee: {
            select: {
              name: true,
            },
          },
          evaluator: {
            select: {
              name: true,
              department: true,
            },
          },
        },
      });
      ifEmpty(evaluations);
      return {
        statusCode: HttpStatus.OK,
        message: 'Evaluations',
        data: evaluations,
      };
    } catch (e) {
      if (
        e instanceof NotFoundException ||
        e instanceof Prisma.PrismaClientKnownRequestError
      ) {
        throw new NotFoundException('Evaluations not found');
      }

      throw new ForbiddenException(e.message);
    }
  }

  /**
   * This function finds a specific evaluation by its id, useful for id views - SANITIZED
   * @param id
   * @param user
   * @returns
   */
  async findOne(id: string, user: ReqUser): Promise<ResponseType<Evaluation>> {
    try {
      const evaluation = await this.db.evaluation.findUnique({
        where: {
          id,
          AND: [accessibleBy(this.ability(user)).Evaluation],
        },
        include: {
          grades: {
            select: {
              score: true,
              metric: {
                select: {
                  name: true,
                },
              },
            },
          },
          evaluator: {
            select: {
              name: true,
              department: true,
            },
          },
          employee: {
            select: {
              name: true,
            },
          },
        },
      });
      ifEmpty(evaluation);
      return {
        statusCode: HttpStatus.OK,
        message: 'Evaluation found',
        data: evaluation,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('Evaluation not found');
      } else {
        throw new ForbiddenException(e.message);
      }
    }
  }

  /**
   * This function finds all evaluations designed to a employee, useful for analysis
   * @param id
   * @param user
   * @returns
   */
  async findAllForOneEmployee(
    id: string,
    user: ReqUser,
  ): Promise<ResponseType<Evaluation[]>> {
    try {
      const evaluations = await this.db.evaluation.findMany({
        where: {
          employee: {
            id: id,
          },
          AND: [accessibleBy(this.ability(user)).Evaluation],
        },
        include: {
          grades: {
            select: {
              score: true,
              metric: {
                select: {
                  name: true,
                },
              },
            },
          },
          evaluator: {
            select: {
              name: true,
              department: true,
            },
          },
        },
      });
      ifEmpty(evaluations);
      return {
        statusCode: HttpStatus.OK,
        message: 'Evaluations',
        data: evaluations,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
  //TODO NAO PERMITIR MUDANÇA NA AVALIAÇÂO?

  async remove(
    id: string,
    user_id: ReqUser,
  ): Promise<ResponseType<Evaluation>> {
    try {
      const removeTest = await this.db.evaluation.delete({
        where: {
          id,
          evaluator_id: user_id.user,
          AND: [accessibleBy(this.ability(user_id)).Evaluation],
        },
      });
      ifEmpty(removeTest);
      try {
        const score = await this.db.grade.aggregate({
          where: {
            employee_id: removeTest.employee_id,
          },
          _avg: {
            score: true,
          },
        });
        await this.db.employee.update({
          where: {
            id: removeTest.employee_id,
          },
          data: {
            score: score._avg.score ? score._avg.score : 0,
          },
        });
      } catch (e) {
        throw new ForbiddenException(e.message);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Evaluation deleted',
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('Evaluation not found');
      } else {
        throw new ForbiddenException(e.message);
      }
    }
  }
}
