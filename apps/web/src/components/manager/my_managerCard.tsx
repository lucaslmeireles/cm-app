import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { AddManagerEmployee } from "../employee/addManagerEmployee";
import { RemoveManagerEmployee } from "./removeManager";

export function MyManagerCard({employee, mutate}: {employee: Employee, mutate: any}) {
    return (
        <Card>
              <CardHeader>
                <div className=" flex flex-row gap-4 my-2 px-3 align-middle items-center justify-between">
                <p className="font-medium text-lg">Supervisores</p>
                <AddManagerEmployee employee={employee} mutate={mutate}/>
                </div>
              </CardHeader>
              <CardContent className="gap-4">
                {employee.my_manager && employee.my_manager.length > 0 ? 
                    employee?.my_manager.map((manager) => {
                        return (
                          <Card key={manager.manager_id} className="p-2 my-4 w-2/5 flex flex-row justify-between">
                              <p>{manager.manager.employee.name}</p>
                              <RemoveManagerEmployee manager={manager} employee={employee} mutate={mutate}/>
                          </Card>
                        );
                      })
                : 
                <div>
                  <p className="px-3">Sem supervisores</p>
                </div>
                }
              </CardContent>

        </Card>
    )
}