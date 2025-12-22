export type Absence =  {
    id: string
    date: string
    justification? : string,
    createdBy: string
    employeeId: string,
    user: {
      manager: {
        employee: {
          name: string
        }
      }
    }
}