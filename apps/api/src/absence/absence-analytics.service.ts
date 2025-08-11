import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';

export class AbsenceAnalyticsService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;

  //TODO Refazer
  async chartByEmployeeMonth(id: string) {
    try {
      const data = await this.db
        .$queryRaw`SELECT to_char("date", 'MM') as mth, count(*) as qtd FROM "Absence" WHERE "employeeId"= ${id} GROUP BY  to_char("date", 'MM');`;
      return { status: HttpStatus.OK, message: 'Chart', data };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }

  async chartByEmployeeYear(id: string) {
    try {
      const data = await this.db
        .$queryRaw`SELECT to_char("date", 'YYYY') as yr, count(*) as qtd FROM "Absence" WHERE "employeeId"= ${id} GROUP BY  to_char("date", 'YYYY');`;
      return { status: HttpStatus.OK, message: 'Chart', data };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }

  async chartByDepartmentMonth(id: string) {
    try {
      const data = await this.db.$queryRaw`SELECT 
      to_char("Absence"."date", 'MM') as absence_date, 
      d.name as department_name, 
      count(*) as total_absences 
      FROM 
          "Absence" 
      JOIN 
          "_DepartmentToEmployee" de ON  "Absence"."employeeId" = de."B" 
      JOIN 
          "Department" d ON de."A" = d.id 
      WHERE
        d.id = ${id}
      GROUP BY 
          to_char("Absence"."date", 'MM'), 
          d.name 
      ORDER BY 
          absence_date, 
          department_name `;
      return { status: HttpStatus.OK, message: 'Chart', data };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }

  async chartByDepartmentYear(id: string) {
    try {
      const data = await this.db.$queryRaw`SELECT 
      to_char("Absence"."date", 'YYYY') as absence_date, 
      d.name as department_name, 
      count(*) as total_absences 
      FROM 
          "Absence" 
      JOIN 
          "_DepartmentToEmployee" de ON  "Absence"."employeeId" = de."B" 
      JOIN 
          "Department" d ON de."A" = d.id 
      WHERE
        d.id = ${id}
      GROUP BY 
          to_char("Absence"."date", 'YYYY'), 
          d.name 
      ORDER BY 
          absence_date, 
          department_name `;
      return { status: HttpStatus.OK, message: 'Chart', data };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }

}