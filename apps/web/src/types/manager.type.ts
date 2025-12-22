export type Manager = {
    user_id: string,
    employee_id: string,
    employee: {
        name: string,
        indentifian: string
    },
    managerEmployee: []
    manager_id?: string
}