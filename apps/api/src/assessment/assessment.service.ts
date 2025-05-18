import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { DbService } from 'src/db/db.service';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ifEmpty } from 'src/helpers/ifempty';
import { CreateDiscDto } from './dto/create-disc.dto';
import { ResponseType } from 'src/types/response.type';
import { Assessment, DISC, Prisma } from '@prisma/client';

export type DISCDepartment = {
  D: number;
  I: number;
  S: number;
  C: number;
};

@Injectable()
export class AssessmentService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;

  /**
   * This function creates a new assessment, it also calculates the employee's score.
   * Each time a new assessment is created, the employee's score is updated.
   * @param dto the data to create an assessment
   * @param user the current user from JWT
   * @returns status code and message
   * @throws {ForbiddenException} if the user is not allowed to create an assessment
   * @throws {BadRequestException} if the data is not valid
   */
  async create(dto: CreateAssessmentDto): Promise<ResponseType<Assessment>> {
    try {
      await this.db.assessment.create({
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
          metrics: {
            create: dto.metrics.map((grade) => ({
              metric: {
                connect: {
                  id: grade.metric_id,
                },
              },
              score: grade.score,
              employee: {
                connect: {
                  id: dto.employee_id,
                },
              },
            })),
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
        message: 'Assessment created',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      }
      throw new ForbiddenException(e.message);
    }
  }

  /**
   * Finds all assessments, restircited by the user's ability - SANITIZED
   * @param user the current user from JWT
   * @returns status code, message and all assessments
   * @throws {ForbiddenException} if the user is not allowed to list all assessments
   */
  async findAll(user: ReqUser): Promise<ResponseType<Assessment[]>> {
    try {
      const assessments = await this.db.assessment.findMany({
        where: accessibleBy(this.ability(user)).Assessment,
        include: {
          _count: {
            select: {
              metrics: true,
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
      ifEmpty(assessments);
      return {
        statusCode: HttpStatus.OK,
        message: 'Assessments',
        data: assessments,
      };
    } catch (e) {
      if (
        e instanceof NotFoundException ||
        e instanceof Prisma.PrismaClientKnownRequestError
      ) {
        throw new NotFoundException('Assessments not found');
      }

      throw new ForbiddenException(e.message);
    }
  }

  /**
   * This function finds a specific assessment by its id, useful for id views - SANITIZED
   * @param id
   * @param user
   * @returns
   */
  async findOne(id: string, user: ReqUser): Promise<ResponseType<Assessment>> {
    try {
      const assessment = await this.db.assessment.findUnique({
        where: {
          id,
          AND: [accessibleBy(this.ability(user)).Assessment],
        },
        include: {
          metrics: {
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
      ifEmpty(assessment);
      return {
        statusCode: HttpStatus.OK,
        message: 'Assessment found',
        data: assessment,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('Assessment not found');
      } else {
        throw new ForbiddenException(e.message);
      }
    }
  }

  /**
   * This function finds all assessments designed to a employee, useful for analysis
   * @param id
   * @param user
   * @returns
   */
  async findAllForOneEmployee(
    id: string,
    user: ReqUser,
  ): Promise<ResponseType<Assessment[]>> {
    try {
      const assessments = await this.db.assessment.findMany({
        where: {
          employee: {
            id: id,
          },
          AND: [accessibleBy(this.ability(user)).Assessment],
        },
        include: {
          metrics: {
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
      ifEmpty(assessments);
      return {
        statusCode: HttpStatus.OK,
        message: 'Assessments',
        data: assessments,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
  //TODO NAO PERMITIR MUDANÇA NA AVALIAÇÂO?

  async remove(
    id: string,
    user_id: ReqUser,
  ): Promise<ResponseType<Assessment>> {
    try {
      const removeTest = await this.db.assessment.delete({
        where: {
          id,
          evaluator_id: user_id.user,
          AND: [accessibleBy(this.ability(user_id)).Assessment],
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
        message: 'Assessment deleted',
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('Assessment not found');
      } else {
        throw new ForbiddenException(e.message);
      }
    }
  }

  // DISC

  /**
   * This function creates a new DISC assessment, if a Disc assessment already exists, it updates it.
   * The employee must ony have a DISC assessment.
   * @param dto
   * @param user
   * @returns  DISC assessment created or updated
   */
  async createDisc(
    dto: CreateDiscDto,
    user: ReqUser,
  ): Promise<ResponseType<DISC>> {
    try {
      const isDisc = await this.db.dISC.findUnique({
        where: {
          employee_id: dto.employee_id,
        },
      });
      if (isDisc) {
        const updatedDisc = await this.db.dISC.update({
          where: {
            employee_id: dto.employee_id,
            AND: [accessibleBy(this.ability(user)).DISC],
          },
          data: {
            ...dto,
          },
        });
        ifEmpty(updatedDisc);
        return {
          statusCode: HttpStatus.OK,
          message: 'DISC updated',
          data: updatedDisc,
        };
      }
      const newDisc = await this.db.dISC.create({
        data: {
          ...dto,
        },
      });
      ifEmpty(newDisc);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'DISC created',
        data: newDisc,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  /**
   * This function finds a specific DISC assessment by its id, useful for id views
   * @param id
   * @param user
   * @returns
   */
  async findOneDISC(id: string, user: ReqUser): Promise<ResponseType<DISC>> {
    try {
      const disc = await this.db.dISC.findUnique({
        where: {
          employee_id: id,
          AND: [accessibleBy(this.ability(user)).DISC],
        },
        include: {
          employee: {
            select: {
              name: true,
            },
          },
        },
      });
      ifEmpty(disc);
      return {
        statusCode: HttpStatus.OK,
        message: 'DISC found',
        data: disc,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('DISC not found');
      }
      throw new ForbiddenException(error.message);
    }
  }

  /**
   * This function finds all DISC assessments, restircited by the user's ability and the department id
   * @param id
   * @param user
   * @returns
   */
  async findDISCByDepartment(
    id: string,
    user: ReqUser,
  ): Promise<ResponseType<DISCDepartment>> {
    try {
      const disc = await this.db.dISC.findMany({
        where: {
          employee: {
            department: {
              some: {
                id: id,
              },
            },
          },
          AND: [accessibleBy(this.ability(user)).DISC],
        },
      });
      const discChart = await this.db.dISC.aggregate({
        _avg: {
          D: true,
          I: true,
          S: true,
          C: true,
        },
        where: {
          employee: {
            department: {
              some: {
                id,
              },
            },
          },
        },
      });
      ifEmpty(disc);
      return {
        statusCode: HttpStatus.OK,
        message: 'DISC found',
        data: discChart._avg,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('DISC not found');
      }
      throw new ForbiddenException(error.message);
    }
  }

  async removeDISC(id: string, user: ReqUser): Promise<ResponseType<DISC>> {
    try {
      const removeDISC = await this.db.dISC.delete({
        where: {
          employee_id: id,
          AND: [accessibleBy(this.ability(user)).DISC],
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'DISC deleted',
        data: removeDISC,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error.code === 'P2025') {
        throw new NotFoundException('DISC not found');
      }
      throw new ForbiddenException(error.message);
    }
  }
}
