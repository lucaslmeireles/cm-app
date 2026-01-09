import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { DbService } from 'src/db/db.service';
import { ifEmpty } from 'src/helpers/ifempty';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { ResponseType } from 'src/types/response.type';
import { Grade } from '@prisma/client';
//TODO REVER MODULO
@Injectable()
export class GradeService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;
    async create(createGradeDto: CreateGradeDto): Promise<ResponseType<Grade>> {
        try {
            const grades = await this.db.grade.create({
                data: {
                    employee: {
                        connect: {
                            id: createGradeDto.employee_id,
                        },
                    },
                    score: createGradeDto.score,
                    metric: {
                        connect: {
                            id: createGradeDto.metric_id,
                        },
                    },
                    evaluation: {
                        connect: {
                            id: createGradeDto.assement_id,
                        },
                    },
                },
            });
            return {
                statusCode: HttpStatus.CREATED,
                data: grades,
                message: 'Grade created successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findAll(user: ReqUser): Promise<ResponseType<Grade[]>> {
        try {
            const data = await this.db.grade.findMany({
                where: {
                    AND: [accessibleBy(this.ability(user)).Grade],
                },
                include: {
                    evaluation: true,
                    employee: true,
                },
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                data: data,
                message: 'Grades found successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    //TODO OLHAR PARA FAZER O FETCH DO STATE
    async findAllGradesByEmployee(
        user: ReqUser,
        id: string,
    ): Promise<ResponseType<Grade[]>> {
        try {
            const data = await this.db.grade.findMany({
                where: {
                    employee_id: id,
                    AND: [accessibleBy(this.ability(user)).Grade],
                },
                include: {
                    evaluation: true,
                    employee: true,
                },
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                data: data,
                message: 'Grades found successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findOne(id: string, user: ReqUser): Promise<ResponseType<Grade>> {
        try {
            const data = await this.db.grade.findFirst({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Grade],
                },
                include: {
                    evaluation: true,
                    employee: true,
                },
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                data: data,
                message: 'Grade found successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async updateGrade(
        id: string,
        updateGradeDto: UpdateGradeDto,
        user: ReqUser,
    ): Promise<ResponseType<Grade>> {
        try {
            const data = await this.db.grade.update({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Grade],
                },
                data: updateGradeDto,
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                data: data,
                message: 'Grade updated successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async removeGrade(id: string, user: ReqUser): Promise<ResponseType<Grade>> {
        try {
            const data = await this.db.grade.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Grade],
                },
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                data: data,
                message: 'Grade deleted successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findGradeForChartDep(user: ReqUser) {
        const data = await this.db.grade.findMany({
            include: {
                metric: true,
                employee: {
                    include: {
                        department: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                employee: {
                    department: {
                        _count: 'desc',
                    },
                },
            },
        });
        return data;
    }
}
