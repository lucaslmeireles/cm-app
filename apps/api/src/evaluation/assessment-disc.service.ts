import { DbService } from 'src/db/db.service';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { AbilityFactory } from 'src/ability/ability.factory';
import { DISC, Prisma } from '@prisma/client';
import { ifEmpty } from 'src/helpers/ifempty';
import { CreateDiscDto } from './dto/create-disc.dto';
import { ResponseType } from 'src/types/response.type';
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export type DISCDepartment = {
  D: number;
  I: number;
  S: number;
  C: number;
};

@Injectable()
export class EvaluationDiscService {
  constructor (
    private readonly db: DbService,
    private readonly ac: AbilityFactory
  ) {}
  ability = this.ac.defineAbility;

  /**
   * This function creates a new DISC evaluation, if a Disc evaluation already exists, it updates it.
   * The employee must ony have a DISC evaluation.
   * @param dto
   * @param user
   * @returns  DISC evaluation created or updated
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
   * This function finds a specific DISC evaluation by its id, useful for id views
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
   * This function finds all DISC evaluations, restircited by the user's ability and the department id
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