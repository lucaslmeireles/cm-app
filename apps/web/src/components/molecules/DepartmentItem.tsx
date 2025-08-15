import { Card } from "@/repo/ui/components/ui/card"
import { Department } from "@/types/department.type"
import { UsersRound } from "lucide-react"

interface DepartmentItemProps {
  department: Department,
  t: (text: string) => string
}

export const DepartmentItem = ({ department, t }: DepartmentItemProps) => {
  return (
    <Card className="border" key={department.id}>
      <div className="m-2 flex flex-row space-x-3 justify-between">
        <h3 className="font-medium mx-3">{department.name} </h3>
        {department._count && (
          <div className="flex flex-row space-x-1">
            <p>
              {department._count.employees
                ? department._count.employees
                : t("no_employees")}
            </p>
            <UsersRound />
          </div>
        )}
      </div>
    </Card>
  )
}