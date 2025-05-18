export type Course = {
    id: string,
    name: string,
    department_id: string,
    level: number,
    due_date: number,
    employees: [
        {
            name: string
        }
    ]
}