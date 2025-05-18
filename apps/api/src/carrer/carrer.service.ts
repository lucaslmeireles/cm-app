import {
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCarrerDto, CreateCarrerStepDto } from './dto/create-carrer.dto';
import { UpdateCarrerDto, UpdateCarrerStepDto } from './dto/update-carrer.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { CareerPath, CareerStep, Prisma } from '@prisma/client';
import { ResponseType } from 'src/types/response.type';
import { CarrerPathSanitized } from 'src/types/carrer.type';
import { ifEmpty } from 'src/helpers/ifempty';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class CarrersService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;

    async createPath(
        createCarrerDto: CreateCarrerDto,
    ): Promise<ResponseType<CareerPath>> {
        try {
            await this.db.careerPath.create({
                data: {
                    employee: {
                        connect: {
                            id: createCarrerDto.employee_id,
                        },
                    },
                    start_date: createCarrerDto.start_date,
                    target_date: createCarrerDto.target_date,
                    description: createCarrerDto.description,
                    status: createCarrerDto.status,
                },
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Created Career Path',
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

    async createPathStep(
        createCarrerStepDto: CreateCarrerStepDto,
    ): Promise<ResponseType<CareerStep>> {
        try {
            await this.db.careerStep.create({
                data: {
                    career_path: {
                        connect: {
                            id: createCarrerStepDto.carrer_path_id,
                        },
                    },
                    order_number: createCarrerStepDto.order_number,
                    position: {
                        connect: {
                            id: createCarrerStepDto.position_id,
                        },
                    },
                    achieved: createCarrerStepDto.achieved,
                    achieved_date: createCarrerStepDto.achieved_date,
                    requirements: createCarrerStepDto.requirements,
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Created Career Path Step',
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

    async findAll(user: ReqUser): Promise<ResponseType<CarrerPathSanitized[]>> {
        try {
            const data = await this.db.careerPath.findMany({
                where: {
                    AND: [accessibleBy(this.ability(user)).CareerPath],
                },
                select: {
                    employee: {
                        select: {
                            current_position: true,
                            department: true,
                            name: true,
                            profile_pic: true,
                        },
                    },
                    description: true,
                    start_date: true,
                    status: true,
                    steps: true,
                    id: true,
                    target_date: true,
                },
            });
            ifEmpty(data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Found all Career Paths',
                data: data,
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

    async findOne(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<CarrerPathSanitized>> {
        try {
            const data = await this.db.careerPath.findUniqueOrThrow({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).CareerPath],
                },
                select: {
                    employee: {
                        select: {
                            current_position: true,
                            department: true,
                            name: true,
                            profile_pic: true,
                        },
                    },
                    description: true,
                    start_date: true,
                    status: true,
                    steps: true,
                    id: true,
                    target_date: true,
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Found all Career Paths',
                data: data,
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

    async updateCarrerPath(
        id: string,
        updateCarrerDto: UpdateCarrerDto,
        user: ReqUser,
    ): Promise<ResponseType<CareerPath>> {
        try {
            const updatedCarrer = await this.db.careerPath.update({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).CareerPath],
                },
                data: {
                    employee: {
                        connect: {
                            id: updateCarrerDto.employee_id,
                        },
                    },
                    start_date: updateCarrerDto.start_date,
                    target_date: updateCarrerDto.target_date,
                    description: updateCarrerDto.description,
                    status: updateCarrerDto.status,
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Updated Career Path',
                data: updatedCarrer,
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

    async updatePathStep(
        id: string,
        updateCarrerStepDto: UpdateCarrerStepDto,
        user: ReqUser,
    ): Promise<ResponseType<CareerStep>> {
        try {
            await this.db.careerStep.update({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).CareerStep],
                },
                data: {
                    career_path: {
                        connect: {
                            id: updateCarrerStepDto.carrer_path_id,
                        },
                    },
                    order_number: updateCarrerStepDto.order_number,
                    position: {
                        connect: {
                            id: updateCarrerStepDto.position_id,
                        },
                    },
                    achieved: updateCarrerStepDto.achieved,
                    achieved_date: updateCarrerStepDto.achieved_date,
                    requirements: updateCarrerStepDto.requirements,
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Created Career Path Step',
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

    async deleteCarrerPath(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<CareerPath>> {
        try {
            await this.db.careerPath.delete({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).CareerPath],
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Deleted Career Path',
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

    async deletePathStep(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<CareerStep>> {
        try {
            await this.db.careerStep.delete({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).CareerStep],
                },
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Deleted Career Path Step',
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
