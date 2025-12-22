import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { accessibleBy } from '@casl/prisma';
import { ReqUser } from 'src/types/requser.type';
import { ifEmpty } from 'src/helpers/ifempty';
import { Formation } from '@prisma/client';
import { ResponseType } from 'src/types/response.type';
//TODO REVER MODULO
@Injectable()
export class FormationsService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;
    async create(
        createFormationDto: CreateFormationDto,
    ): Promise<ResponseType<Formation>> {
        try {
            await this.db.formation.create({
                data: {
                    name: createFormationDto.name,
                    type: createFormationDto.type,
                    employee: {
                        connect: {
                            id: createFormationDto.employee_id,
                        },
                    },
                },
            });

            return {
                statusCode: 201,
                message: 'Formation created successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findAll(user: ReqUser): Promise<ResponseType<Formation[]>> {
        try {
            const formations = await this.db.formation.findMany({
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
                    AND: [accessibleBy(this.ability(user)).Formation],
                },
            });

            ifEmpty(formations);
            return {
                statusCode: HttpStatus.OK,
                message: 'Formations from all users',
                data: formations,
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findOne(id: string, user: ReqUser): Promise<ResponseType<Formation>> {
        try {
            const formation = await this.db.formation.findUnique({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).Formation],
                },
                include: {
                    employee: true,
                },
            });

            ifEmpty(formation);
            return {
                statusCode: 200,
                message: 'Formation from one employee',
                data: formation,
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findAllByEmployee(
        employee_id: string,
        user: ReqUser,
    ): Promise<ResponseType<Formation[]>> {
        try {
            const formations = await this.db.formation.findMany({
                include: {
                    employee: true,
                },
                where: {
                    employee: {
                        id: {
                            equals: employee_id,
                        },
                    },
                    AND: [accessibleBy(this.ability(user)).Formation],
                },
            });

            ifEmpty(formations);
            return {
                statusCode: 200,
                message: 'All formations from one employee',
                data: formations,
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async update(
        id: string,
        updateFormationDto: UpdateFormationDto,
        user: ReqUser,
    ): Promise<ResponseType<Formation>> {
        try {
            const updatedFormation = await this.db.formation.update({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).Formation],
                },
                data: {
                    name: updateFormationDto.name,
                    type: updateFormationDto.type,
                },
            });
            ifEmpty(updatedFormation);
            return {
                statusCode: 200,
                message: 'Formation updated',
                data: updatedFormation,
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async remove(id: string, user: ReqUser): Promise<ResponseType<Formation>> {
        try {
            const deletedFormation = await this.db.formation.delete({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).Formation],
                },
            });

            ifEmpty(deletedFormation);
            return {
                statusCode: 200,
                message: 'Formation deleted',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }
}
