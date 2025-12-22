import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { accessibleBy } from '@casl/prisma';
import { ifEmpty } from 'src/helpers/ifempty';
import { ResponseType } from 'src/types/response.type';
import { Department, Prisma } from '@prisma/client';

export interface DepartmentWithAvgScore extends Department {
    average_score: number | null;
}

@Injectable()
export class DepartmentsService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    /**
     * Define the ability for the user
     */
    ability = this.ac.defineAbility;

    /**
     * This function creates a new department
     * @param user the current user from JWT
     * @param dto the data to create a department
     * @returns status code and message
     * @throws {ForbiddenException} if the user is not allowed to create a department
     * @throws {BadRequestException} if the data is not valid
     */
    async createDepartment(
        user: ReqUser,
        dto: CreateDepartmentDto,
    ): Promise<ResponseType<Department>> {
        try {
            await this.db.department.create({
                data: {
                    name: dto.name,
                    tenant_id: user.tenant_id,
                    metrics: {
                        connect: dto.metric_id.map((id) => {
                            return { id: id };
                        }),
                    },
                },
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Department created',
            };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    /**
     * This function lists all departments, with count of jobs and employees. - SANITEZED
     * @param user the current user from JWT
     * @returns status code, message and all departments
     * @throws {ForbiddenException} if the user is not allowed to list all departments
     * @throws {NotFoundException} if there are no departments
     */
    async findAllDepartments(
        user: ReqUser,
    ): Promise<ResponseType<Department[]>> {
        try {
            const departments = await this.db.department.findMany({
                where: accessibleBy(this.ability(user)).Department,
                include: {
                    _count: {
                        select: {
                            employees: true,
                            positions: true,
                        },
                    },
                },
            });
            ifEmpty(departments);
            return {
                statusCode: HttpStatus.OK,
                message: 'Departments',
                data: departments,
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    /**
     * This function finds one department
     * @param id the department id
     * @param user the current user from JWT
     * @returns status code, message and the department
     * @throws {ForbiddenException} if the user is not allowed to find one department
     * @throws {NotFoundException} if the department is not found
     */
    async findOneDepartment(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<Department>> {
        try {
            const oneDep = await this.db.department.findFirst({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Department],
                },
                include: {
                    employees: {
                        select: {
                            name: true,
                        },
                    },
                    jobs: {
                        select: {
                            name: true,
                        },
                    },
                    metrics: {
                        select: {
                            name: true,
                        },
                    },
                    _count: {
                        select: {
                            employees: true,
                            positions: true,
                        },
                    },
                },
            });
            ifEmpty(oneDep);
            return {
                statusCode: HttpStatus.OK,
                message: 'Department',
                data: oneDep,
            };
        } catch (e) {
            if (
                e instanceof NotFoundException ||
                e instanceof Prisma.PrismaClientKnownRequestError
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    /**
     * This function updates a department
     * @param id the department id
     * @param user the current user from JWT
     * @param dto the data to update a department
     * @returns status code and message
     * @throws {ForbiddenException} if the user is not allowed to update a department
     * @throws {NotFoundException} if the department is not found
     * @throws {BadRequestException} if the data is not valid
     */
    async updateDepartment(
        id: string,
        user: ReqUser,
        dto: UpdateDepartmentDto,
    ): Promise<ResponseType<Department>> {
        try {
            const updateDepartament = await this.db.department.update({
                where: {
                    id: id,
                    AND: [accessibleBy(this.ability(user)).Department],
                },
                data: {
                    name: dto.name,
                    jobs: {
                        set: dto.job_id.map((id) => {
                            return { id: id };
                        }),
                    },
                    metrics: {
                        set: dto.metric_id.map((id) => {
                            return { id: id };
                        }),
                    },
                },
            });
            ifEmpty(updateDepartament);
            return {
                statusCode: HttpStatus.OK,
                message: 'Department updated',
            };
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new NotFoundException(e.message);
            }
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }

    /**
     * This function removes a department
     * @param id the department id
     * @param user the current user from JWT
     * @returns status code and message
     * @throws {ForbiddenException} if the user is not allowed to remove a department
     * @throws {NotFoundException} if the department is not found
     */
    async removeDepartment(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<Department>> {
        try {
            const removedDep = await this.db.department.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Department],
                },
            });
            ifEmpty(removedDep);
            return {
                statusCode: HttpStatus.OK,
                message: 'Department removed',
            };
        } catch (e) {
            if (
                e instanceof NotFoundException ||
                e instanceof Prisma.PrismaClientKnownRequestError
            ) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }
}
