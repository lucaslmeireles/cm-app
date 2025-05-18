import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { DbService } from 'src/db/db.service';
import { CreateEmployee, EditEmployee } from './dto';
import { Employee, Prisma } from '@prisma/client';
import { accessibleBy } from '@casl/prisma';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { ifEmpty } from 'src/helpers/ifempty';
import { GetEmployeeByDep } from './dto/getemployeebydep.dto';
import { ResponseType } from 'src/types/response.type';
import { EncryptionService } from 'src/encryption/encryption.service';
import {
    EmployeeSanitized,
    EmployeeSanitizedDepartment,
    EmployeeSanitizedId,
    EmployeeSanitizedManager,
} from 'src/types/employee.type';

@Injectable()
export class EmployeeService {
    constructor(
        private encryptionHelper: EncryptionService,
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    /**
     * Define the ability for the user
     * Define the salt rounds for the password
     */
    ability = this.ac.defineAbility;
    saltRounds = 10;

    /**
     * This function gets all employees from one organization - SANITIZED
     * @param user The current user from the JWT
     * @returns All the users in the organization
     * @throws {ForbiddenException} If the user does not have the permission to see the employees
     * @throws {NotFoundException} If there are no employees in the organization
     */
    async getAllemployees(
        user: ReqUser,
    ): Promise<ResponseType<EmployeeSanitized[]>> {
        try {
            const employees = await this.db.employee.findMany({
                where: {
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    id: true,
                    register: true,
                    name: true,
                    current_position: {
                        select: {
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            name: true,
                        },
                    },
                    entry_date: true,
                },
            });
            ifEmpty(employees);
            return {
                statusCode: HttpStatus.OK,
                message: 'All Employees',
                data: employees,
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

    /**
     * This function gets one employee by its id.
     * It also includes the department, courses, formations, assessments, job and manager
     * This function only allow the user to see the employee if he is the supervisor of the employee or the manager of the supervisor
     * @param id The id of the employee
     * @param user The current user from the JWT
     * @returns The employee object
     * @throws {ForbiddenException} If the user does not have the permission to see the employee
     * @throws {NotFoundException} If the employee does not exist
     */
    //TODO Campos sensiveis baseados no nivel de user
    async getEmployeeById(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<EmployeeSanitizedId>> {
        //TODO IMplement encrypt dadta for HR
        try {
            const employee = await this.db.employee.findUnique({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    name: true,
                    entry_date: true,
                    profile_pic: true,
                    score: true,
                    department: true,
                    formations: true,
                    approved_absences: true,
                    current_position: true,
                    career_paths: true,
                    manager: true,
                    subordinates: true,
                    user: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            ifEmpty(employee);
            return {
                statusCode: HttpStatus.OK,
                message: 'Employee',
                data: employee,
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

    /**
     * This function gets all employees by manager
     * Olny the supervisor gets hiw own employees and the manager gets everyone
     * @param user The current user from the JWT
     * @returns All the employees from the manager
     * @throws {ForbiddenException} If the user does not have the permission to see the employees
     * @throws {NotFoundException} If there are no employees from that manager
     */
    async getEmployeeByManager(
        user: ReqUser,
    ): Promise<ResponseType<EmployeeSanitizedManager[]>> {
        try {
            const employeesByManager = await this.db.employee.findMany({
                where: {
                    manager: {
                        user: {
                            id: user.user,
                        },
                    },
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    name: true,
                    current_position: {
                        select: {
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            name: true,
                        },
                    },
                    entry_date: true,
                    email_encrypted: true,
                },
            });
            ifEmpty(employeesByManager);
            return {
                statusCode: HttpStatus.OK,
                message: 'Employees by Manager',
                data: employeesByManager.map((employee) => {
                    return {
                        ...employee,
                        email: this.encryptionHelper.decrypt(
                            employee.email_encrypted,
                        ),
                    };
                }),
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

    /**
     * Function in construction. Use with caution
     * @param file
     * @param req
     * @param id
     * @returns
     */
    async attachImage(file: Express.Multer.File, req: Request, id: string) {
        const img_url = `${req.protocol}}://${req.get('host')}/files/${file.filename}`;
        try {
            const updatedEmployee = await this.db.employee.update({
                where: {
                    id,
                },
                data: {
                    profile_pic: img_url,
                },
            });
            ifEmpty(updatedEmployee);
            return updatedEmployee;
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

    /**
     * This function creates a new employee
     * @param dto New employee information
     * @param user The current user from the JWT
     * @returns Message with the status code
     * @throws {BadRequestException} If the data is not corrected
     *
     */
    async createEmployee(
        dto: CreateEmployee,
        user: ReqUser,
    ): Promise<ResponseType<{ id: string }>> {
        //encrypt the register
        console.log(dto);
        try {
            const employee = await this.db.employee.create({
                data: {
                    name: dto.name,
                    birthday: dto.birthday,
                    entry_date: dto.entry_date,
                    register: dto.register,
                    org: {
                        //TODO como vai ser um RH, ele vai poder criar em qualquer org
                        connect: {
                            id: dto.tenant_id || user.tenant_id,
                        },
                    },
                    score: dto.score || 0,
                    phone_encrypted: this.encryptionHelper.encrypt(dto.phone),
                    email_encrypted: this.encryptionHelper.encrypt(dto.email),
                    department: {
                        connect: dto.departments.map((id) => {
                            return {
                                id: id,
                            };
                        }),
                    },
                    ...(dto.manager_id && {
                        manager: {
                            connect: {
                                id: dto?.manager_id,
                            },
                        },
                    }),
                    ...(dto.address && {
                        address_encrypted: this.encryptionHelper.encrypt(
                            dto.address,
                        ),
                    }),
                    ...(dto.position && {
                        current_position: {
                            connect: {
                                id: dto.position,
                            },
                        },
                    }),
                },
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Employee Created',
                data: {
                    id: employee.id,
                },
            };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    /**
     * This function edits an employee by its id
     * @param id From the employee to be edited
     * @param user The current user from the JWT
     * @param dto The new information for the employee
     * @returns Message with the status code
     * @throws {ForbiddenException} If the user does not have the permission to edit the employee
     * @throws {NotFoundException} If the employee does not exist
     */
    async editEmployeeById(
        id: string,
        user: ReqUser,
        dto: EditEmployee,
    ): Promise<ResponseType<Employee>> {
        try {
            const editEmployee = await this.db.employee.update({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                data: {
                    register: dto.register,
                    birthday: dto.birthday,
                    entry_date: dto.entry_date,
                    name: dto.name,
                    ...(dto.manager_id && {
                        manager: {
                            connect: {
                                id: dto.manager_id,
                            },
                        },
                    }),
                    ...(dto.departments && {
                        department: {
                            set: dto.departments.map((id) => {
                                return {
                                    id: id,
                                };
                            }),
                        },
                    }),
                    ...(dto.address && {
                        address_encrypted: this.encryptionHelper.encrypt(
                            dto.address,
                        ),
                    }),
                    ...(dto.phone && {
                        phone_encrypted: this.encryptionHelper.encrypt(
                            dto.phone,
                        ),
                    }),
                    ...(dto.email && {
                        email_encrypted: this.encryptionHelper.encrypt(
                            dto.email,
                        ),
                    }),
                },
            });
            ifEmpty(editEmployee);
            return {
                statusCode: HttpStatus.OK,
                message: 'Employee Updated',
            };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new BadRequestException(e.message);
            } else if (e instanceof NotFoundException) {
                throw new NotFoundException(e.message);
            }
            throw new ForbiddenException(e.message);
        }
    }
    /**
     * This function deletes the employee by its id
     * @param id The employee id to be deleted
     * @param user The current user from JWT
     * @returns Statuscode and message
     * @throws {ForbiddenException} If the user does not have the permission to delete the employee
     * @throws {NotFoundException} If the employee does not exist
     */
    async deleteEmployee(
        id: string,
        user: ReqUser,
    ): Promise<ResponseType<Employee>> {
        try {
            const deletedEmployee = await this.db.employee.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
            });
            ifEmpty(deletedEmployee);
            return {
                statusCode: HttpStatus.OK,
                message: 'Deleted',
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

    /**
     * This function gets all employees by department
     * @param dto The departments ids that the user wants to get the employees
     * @param user The current user from the JWT
     * @returns All the employees from the departments
     * @throws {ForbiddenException} If the user does not have the permission to see the employees
     * @throws {NotFoundException} If there are no employees in the departments
     */
    async getEmployeeByDepartment(
        dto: GetEmployeeByDep,
        user: ReqUser,
    ): Promise<ResponseType<EmployeeSanitizedDepartment[]>> {
        try {
            const employeesByDep = await this.db.employee.findMany({
                where: {
                    department: {
                        some: {
                            id: {
                                in: dto.department_id,
                            },
                        },
                    },
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                select: {
                    name: true,
                    register: true,
                    department: {
                        select: {
                            name: true,
                        },
                    },
                    current_position: {
                        select: {
                            name: true,
                        },
                    },
                    manager: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            ifEmpty(employeesByDep);
            return {
                statusCode: HttpStatus.OK,
                message: 'Employees by Department',
                data: employeesByDep,
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

    //TODO: Implement in the user creation process
    //Quanto for criar o usuario 2 opçoes o RH vai atribuir esse usuario a algum func ja existente
    //ou vai criar um novo funcionario
    //O RH não pode ser um funcionario, ele é apenas um usuario
    /**
     * This function creates a new employee, its used on the process of creating a new user.
     * By the constrains in the database every user must have an employee profile associated to it
     * @param dto Data to create the new employee
     * @param user The current user from the JWT
     * @returns Message with the status code
     * @throws {BadRequestException} If the data is not corrected or missing
     */
    /*
    async createManagerEmployee(
        dto: CreateManagerEmployee,
        user: ReqUser,
    ): Promise<ResponseType<Employee>> {
        try {
            const newManagerEmployee = await this.db.employee.create({
                data: {
                    name: dto.name,
                    birthday: dto.birthday,
                    entry_date: dto.entry_date,
                    score: dto.score || 0,
                    org: {
                        connect: {
                            id: user.tenant_id,
                        },
                    },
                    job: {
                        connect: {
                            id: dto.job_id,
                        },
                    },
                    profile_pic: '',
                    phone: dto.phone,
                    phone2: dto.phone2,
                    email: dto.email,
                    address: dto.address,
                    register: dto.register,
                    identifiant: dto.identifiant,
                },
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Manager Employee Created',
                data: newManagerEmployee,
            };
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException(
                        'Identfiant or Register already exists',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            throw new BadRequestException(e.message);
        }
    }
    */

    /**
     * This function return the 5 recent hires in the organization
     * @param user The current user from the JWT
     * @returns The 5 recent hires
     * @throws {ForbiddenException} If the user does not have the permission to see the employees
     */

    async recentHires(
        user: ReqUser,
    ): Promise<ResponseType<EmployeeSanitized[]>> {
        try {
            const recentEmployees = await this.db.employee.findMany({
                where: {
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                orderBy: {
                    entry_date: 'desc',
                },
                select: {
                    id: true,
                    name: true,
                    entry_date: true,
                    current_position: {
                        select: {
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            name: true,
                        },
                    },
                    profile_pic: true,
                },
                take: 5,
            });
            ifEmpty(recentEmployees);
            return {
                statusCode: HttpStatus.OK,
                message: 'Recent employees',
                data: recentEmployees,
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
