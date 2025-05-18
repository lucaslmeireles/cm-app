import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrgDto } from './dto/create-org.dto';
import { ReqUser } from 'src/types/requser.type';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { accessibleBy } from '@casl/prisma';
import { ifEmpty } from 'src/helpers/ifempty';
//TODO Revisar esse service
@Injectable()
export class OrgService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;

    async findAll(user: ReqUser) {
        console.log(user);
        try {
            const orgs = await this.db.organization.findMany({
                where: accessibleBy(this.ability(user)).Organization,
            });
            ifEmpty(orgs);
            return orgs;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async listInfo(user: ReqUser) {
        const info = await this.db.organization.findMany({
            where: {
                members: {
                    some: {
                        id: {
                            equals: user.user,
                        },
                    },
                },
            },
            include: {
                _count: {
                    select: {
                        members: true,
                        employees: true,
                        departments: true,
                        jobs: true,
                        metrics: true,
                    },
                },
            },
        });
        const employeesData = await this.db.employee.aggregate({
            _avg: {
                score: true,
            },
            where: accessibleBy(this.ability(user)).Employee,
        });

        const employeeAge = await this.db
            .$queryRaw`SELECT extract(YEAR FROM AVG(age(birthday)))::text AS AvgBirthdayAge, extract(YEAR from AVG(age(entry_date)))::text AS AvgEntryDateAge from "Employee";`;

        return {
            info,
            employeesData,
            employeeAge,
        };
    }

    async getRankedEmployee(user: ReqUser) {
        try {
            const rank = await this.db.employee.findMany({
                where: {
                    manager: {
                        is: null,
                    },
                    AND: [accessibleBy(this.ability(user)).Employee],
                },
                orderBy: {
                    score: 'desc',
                },
                take: 4,
            });
            return rank;
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    async getAllChart() {
        const chart = await this.db
            .$queryRaw`SELECT avg("Grade".score), "Metric".name FROM "Grade" join "Metric" on metric_id = "Metric".id GROUP BY "Metric".name`;
        return chart;
    }

    async getEmployeeChart(id: string) {
        const chart = await this.db
            .$queryRaw`SELECT avg("Grade".score), "Metric".name as metric_name, "Employee".name  as employee_name FROM "Grade" join "Metric" on metric_id = "Metric".id JOIN "Employee" on "Grade".employee_id = "Employee".id  WHERE "Grade".employee_id = ${id} GROUP BY "Metric".name, "Employee".name;`;
        return chart;
    }

    async getDepartmentChart(id: string) {
        const chart = await this.db
            .$queryRaw`SELECT avg("Grade".score) as avg, "Department".name as department_name , "Metric".name as metric_name from "Grade" JOIN "Metric" on "Grade".metric_id = "Metric".id JOIN "_DepartmentToEmployee" On "A" = ${id} JOIN "Department"  on "A" = "Department".id GROUP BY "Metric".name, "Department".name ORDER BY avg;`;

        return chart;
    }

    async getSupervisorChart(id: string) {
        const chart = await this.db
            .$queryRaw`SELECT avg("Grade".score), "Metric".name as metric_name from "Grade" JOIN "Metric" on "Grade".metric_id = "Metric".id JOIN "Assessment" on "Assessment".manager_id = ${id}  GROUP BY "Metric".name`;
        return chart;
    }

    async getEmployeeCountByDepartment() {
        const chart = await this.db
            .$queryRaw`SELECT  "Department".name as name, count(*) FROM "_DepartmentToEmployee" JOIN "Department" ON  "Department".id = "A" GROUP BY "Department".name;`;
        return chart;
    }
}

// querry geral  SELECT avg("Grade".score), "Metric".name FROM "Grade" join "Metric" on metric_id = "Metric".id GROUP BY "Metric".name
// query por funcionario SELECT avg("Grade".score), "Metric".name, "Employee".name FROM "Grade" join "Metric" on metric_id = "Metric".id JOIN "Employee" on "Grade".employee_id = "Employee".id  WHERE "Grade".employee_id = 'ID' GROUP BY "Metric".name, "Employee".name;
// query por departmento SELECT avg("Grade".score), "Department".name, "Metric".name from "Grade" JOIN "Metric" on "Grade".metric_id = "Metric".id JOIN "_DepartmentToEmployee" On "A" = 'ID' JOIN "Department"  on "A" = "Department".id GROUP BY "Metric".name, "Department".name
// query por supervisor SELECT avg("Grade".score),  "Metric".name from "Grade" JOIN "Metric" on "Grade".metric_id = "Metric".id JOIN "Assessment" on "Assessment".manager_id = 'b496fc18-b140-442f-9c42-af478c2d9483'  GROUP BY "Metric".name
