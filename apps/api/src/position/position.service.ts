import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ResponseType } from 'src/types/response.type';
import { Position, Prisma } from '@prisma/client';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { ifEmpty } from 'src/helpers/ifempty';

//TODO doc
@Injectable()
export class PositionsService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;
    async create(
        createPositionDto: CreatePositionDto,
    ): Promise<ResponseType<Position>> {
        try {
            const data = await this.db.position.create({
                data: {
                    ...createPositionDto,
                    employees: {
                        connect: createPositionDto.employees?.map((emp) => ({
                            id: emp.id,
                        })),
                    },
                },
            });
            return {
                statusCode: 201,
                data,
                message: 'Position created successfully',
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findAll(user: ReqUser): Promise<ResponseType<Position[]>> {
        try {
            const data = await this.db.position.findMany({
                where: {
                    AND: [accessibleBy(this.ability(user)).Position],
                },
            });
            ifEmpty(data);
            return {
                statusCode: 200,
                data,
                message: 'Positions fetched successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    async findOne(id: string, user: ReqUser): Promise<ResponseType<Position>> {
        try {
            const data = await this.db.position.findUnique({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Position],
                },
            });
            ifEmpty(data);
            return {
                statusCode: 200,
                data,
                message: 'Position fetched successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    async update(
        id: string,
        updatePositionDto: UpdatePositionDto,
        user: ReqUser,
    ): Promise<ResponseType<Position>> {
        try {
            const data = await this.db.position.update({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Position],
                },
                data: {
                    ...updatePositionDto,
                    employees: {
                        connect: updatePositionDto.employees?.map((emp) => ({
                            id: emp.id,
                        })),
                    },
                },
            });
            ifEmpty(data);
            return {
                statusCode: 200,
                message: 'Position updated successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    async remove(id: string, user: ReqUser): Promise<ResponseType<Position>> {
        try {
            const data = await this.db.position.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Position],
                },
            });
            return {
                statusCode: 200,
                data,
                message: 'Position deleted successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    //TODO apenas o historico sem a atual
    async getHistoryFromEmployee(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<any>> {
        try {
            const crr_position = await this.db.employee.findUnique({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    current_position: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            const data = await this.db.position.findMany({
                where: {
                    employees: {
                        some: {
                            id,
                        },
                    },
                    id: {
                        not: crr_position.current_position.id,
                    },
                    AND: [accessibleBy(this.ability(user)).Position],
                },
                select: {
                    id: true,
                    name: true,
                    department: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    job: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    requirements: true,
                    is_active: true,
                    level: true,
                    created_at: true,
                    updated_at: true,
                    career_steps: {
                        select: {
                            career_path: {
                                select: {
                                    id: true,
                                    status: true,
                                    description: true,
                                },
                            },
                            position: {
                                select: {
                                    id: true,
                                    name: true,
                                    department: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                    job: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            ifEmpty(data);
            return {
                statusCode: 200,
                data,
                message: 'Positions fetched successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    async getCurrentPosition(id: string, user: ReqUser) {
        try {
            const data = await this.db.employee.findUnique({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    id: true,
                    name: true,
                    current_position: {
                        select: {
                            id: true,
                            name: true,
                            department: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                            job: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                            requirements: true,
                            is_active: true,
                            level: true,
                            created_at: true,
                            updated_at: true,
                            salaries: {
                                select: {
                                    type: true,
                                    value: true,
                                },
                            },
                        },
                    },
                },
            });
            ifEmpty(data);
            return {
                statusCode: 200,
                data,
                message: 'Current position fetched successfully',
            };
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError ||
                e instanceof NotFoundException
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }
}
