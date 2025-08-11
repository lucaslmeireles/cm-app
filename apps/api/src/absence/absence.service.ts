import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { ifEmpty } from 'src/helpers/ifempty';
import { Absence, AbsenceType } from '@prisma/client';
import { ResponseType } from 'src/types/response.type';

type AbsenceSanitized = {
  approver_id: string;
  employee_id: string;
  start_date: Date;
  end_date?: Date;
  status: string;
  type: AbsenceType;
};

@Injectable()
export class AbsenceService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;

  /**
   *  Function to create an absence for an employee
   * @param user_id
   * @returns
   */
  async create(dto: CreateAbsenceDto): Promise<ResponseType<Absence>> {
    try {
      await this.db.absence.create({
        data: {
          start_date: dto.start_date,
          end_date: dto.end_date ? dto.end_date : dto.start_date,
          type: dto.type,
          justification: dto.justification,
          documents: dto.document,
          status: dto.status,
          approver: {
            connect: {
              id: dto.approver_id,
            },
          },
          employee: {
            connect: {
              id: dto.employee_id,
            },
          },
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Created',
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   *  Function to list all absences from all employees and departments, use with catuion
   * @param user_id
   * @returns
   */
  async findAll(user_id: ReqUser): Promise<ResponseType<AbsenceSanitized[]>> {
    try {
      const absences = await this.db.absence.findMany({
        where: accessibleBy(this.ability(user_id)).Absence,
        select: {
          approver_id: true,
          employee_id: true,
          start_date: true,
          end_date: true,
          status: true,
          type: true,
          id: true,
        },
      });
      ifEmpty(absences);
      return {
        statusCode: HttpStatus.OK,
        message: 'Absences',
        data: absences,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  /**
   * Function to list all absences from a specific employee, send via url request - SANITIZED
   * @param id
   * @param user_id
   * @returns
   * @throws ForbiddenException
   */
  async findAllByEmployee(
    id: string,
    user_id: ReqUser,
  ): Promise<ResponseType<AbsenceSanitized[]>> {
    try {
      const allAbsencesFromEmployee = await this.db.absence.findMany({
        where: {
          employee_id: id,
          AND: [accessibleBy(this.ability(user_id)).Absence],
        },
        select: {
          id: true,
          approver_id: true,
          employee_id: true,
          start_date: true,
          end_date: true,
          status: true,
          type: true,
          approver: {
            select: {
              id: true,
              name: true,
              profile_pic: true,
            },
          },
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Absences by employee',
        data: allAbsencesFromEmployee,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  /**
   * Function return one absence - NOT SANITIZED, use with caution
   * @param id
   * @param user_id
   * @returns
   * @throws ForbiddenException
   */
  async findOne(id: string, user_id: ReqUser): Promise<ResponseType<Absence>> {
    try {
      const absence = await this.db.absence.findFirst({
        where: {
          id,
          AND: [accessibleBy(this.ability(user_id)).Absence],
        },
      });
      ifEmpty(absence);
      return {
        statusCode: HttpStatus.OK,
        message: 'Absence founded',
        data: absence,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
  /**
   * Function to updaten one absences
   * @param id
   * @param user_id
   * @returns
   * @throws ForbiddenException
   */
  //TODO Quando for um gerente atualizando o id dele passa a ser o aprovador
  async update(
    id: string,
    dto: UpdateAbsenceDto,
    user_id: ReqUser,
  ): Promise<ResponseType<Absence>> {
    try {
      const updateAbsence = await this.db.absence.update({
        where: {
          id,
          AND: [accessibleBy(this.ability(user_id)).Absence],
        },
        data: {
          start_date: dto.start_date,
          end_date: dto.end_date,
          type: dto.type,
          justification: dto.justification,
          documents: dto.document,
          status: dto.status,
          approver: {
            connect: {
              id: dto.approver_id,
            },
          },
          employee: {
            connect: {
              id: dto.employee_id,
            },
          },
        },
      });
      ifEmpty(updateAbsence);
      return { statusCode: HttpStatus.OK, message: 'Updated' };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Function to delete one absence
   * @param id
   * @param user_id
   * @returns
   * @throws ForbiddenException
   */
  async remove(
    id: string,
    user_id: ReqUser,
  ): Promise<ResponseType<AbsenceSanitized>> {
    try {
      const absence = await this.db.absence.delete({
        where: {
          id,
          AND: [accessibleBy(this.ability(user_id)).Absence],
        },
      });
      ifEmpty(absence);
      return { statusCode: HttpStatus.OK, message: 'Deleted' };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
