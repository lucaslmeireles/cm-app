import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { accessibleBy } from '@casl/prisma';
import { ReqUser } from 'src/types/requser.type';
import { ifEmpty } from 'src/helpers/ifempty';
import { Education } from '@prisma/client';
import { ResponseType } from 'src/types/response.type';
//TODO REVER MODULO
@Injectable()
export class EducationsService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;
  async create(
    createEducationDto: CreateEducationDto,
  ): Promise<ResponseType<Education>> {
    try {
      await this.db.education.create({
        data: {
          name: createEducationDto.name,
          type: createEducationDto.type,
          employee: {
            connect: {
              id: createEducationDto.employee_id,
            },
          },
        },
      });

      return {
        statusCode: 201,
        message: 'Education created successfully',
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async findAll(user: ReqUser): Promise<ResponseType<Education[]>> {
    try {
      const educations = await this.db.education.findMany({
        include: {
          employee: {
            select: {
              id: true,
              name: true,
              profile_pic: true,
            },
          },
        },
        where: {
          AND: [accessibleBy(this.ability(user)).Education],
        },
      });

      ifEmpty(educations);
      return {
        statusCode: HttpStatus.OK,
        message: 'Educations from all users',
        data: educations,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async findOne(id: string, user: ReqUser): Promise<ResponseType<Education>> {
    try {
      const education = await this.db.education.findUnique({
        where: {
          id: id,
          AND: [accessibleBy(this.ability(user)).Education],
        },
        include: {
          employee: true,
        },
      });

      ifEmpty(education);
      return {
        statusCode: 200,
        message: 'Education from one employee',
        data: education,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async findAllByEmployee(
    employee_id: string,
    user: ReqUser,
  ): Promise<ResponseType<Education[]>> {
    try {
      const educations = await this.db.education.findMany({
        include: {
          employee: true,
        },
        where: {
          employee: {
            id: {
              equals: employee_id,
            },
          },
          AND: [accessibleBy(this.ability(user)).Education],
        },
      });

      ifEmpty(educations);
      return {
        statusCode: 200,
        message: 'All educations from one employee',
        data: educations,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
    user: ReqUser,
  ): Promise<ResponseType<Education>> {
    try {
      const updatedEducation = await this.db.education.update({
        where: {
          id: id,
          AND: [accessibleBy(this.ability(user)).Education],
        },
        data: {
          name: updateEducationDto.name,
          type: updateEducationDto.type,
        },
      });
      ifEmpty(updatedEducation);
      return {
        statusCode: 200,
        message: 'Education updated',
        data: updatedEducation,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async remove(id: string, user: ReqUser): Promise<ResponseType<Education>> {
    try {
      const deletedEducation = await this.db.education.delete({
        where: {
          id: id,
          AND: [accessibleBy(this.ability(user)).Education],
        },
      });

      ifEmpty(deletedEducation);
      return {
        statusCode: 200,
        message: 'Education deleted',
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
