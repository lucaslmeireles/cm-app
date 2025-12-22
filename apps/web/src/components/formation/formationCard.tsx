"use client";

import { getAllByEmployeeId } from "@/fetch/formation/getAllByEmployeeId";
import { Card, CardContent, CardHeader } from "@/repo/ui/components/ui/card";

import { Employee } from "@/types/employee.type";
import { FormationType } from "@/types/formation.type";
import { AddFormationSingle } from "./addFormationSingle";
import { EditFormation } from "./editFormation";
import { DeleteFormation } from "./deleteFormation";
import { useTranslations } from "next-intl";
import useSWR from "swr";

export function FormationCard({ employee}: { employee: Employee }) {
  const t = useTranslations("Employee.View")
  console.log(employee.id)
  const { data: formations, isLoading, error, mutate } = useSWR<FormationType[],Error>(`${employee.id}/formation`, getAllByEmployeeId);
  console.log(error, formations)
   
  return !isLoading ? (
    <Card>
      <CardHeader>
      <div className=" flex flex-row gap-4  px-3 align-middle items-center justify-between">
        <p className="font-medium text-lg">{t("formation")}</p>
        <AddFormationSingle employee={employee} mutate={mutate}/>
      </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 w-full lg:w-7/12 lg:grid-cols-2">
          {formations?.length > 0 ? (
            formations.map((formation) => {
              return (
                <div
                  key={formation.id}
                  className="flex flex-row border mx-3 my-4 p-2 justify-between rounded"
                >
                  <div className="w-full">
                    <h4>{formation.name}</h4>
                    <small>{formation.type}</small>
                  </div>
                  <div className="flex flex-row align-middle items-center gap-3 mx-3">
                    <DeleteFormation formation={formation} mutate={mutate}/>
                    <EditFormation formation={formation}  mutate={mutate}/>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="px-3">{t("no_formation")}</p>
          )}
        </div>
      </CardContent>
    </Card>
  ): (
    <Card>
      <CardHeader>
      <div className=" flex flex-row gap-4  px-3 align-middle items-center justify-between">
        <p className="font-medium text-lg">{t("formation")}</p>
        <AddFormationSingle employee={employee} mutate={mutate}/>
      </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-7/12">
          <p>Carregando</p>
        </div>
      </CardContent>
    </Card>
  )
}
