"use client";
import { calculateColor } from "@/helpers/calculateColor";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import useStore from "@/store/metric.store";
import { useEffect, useState } from "react";
import { AddGrade } from "../grade/addGrade";
import { Button } from "@/repo/ui/components/ui/button";
import { postNewAssessment } from "@/fetch/assessment/postNewAssessment";
import useGrade from "@/store/grade.store";
import { Dialog } from "@/repo/ui/components/ui/dialog";
import { Employee } from "@/types/employee.type";
import { fetchEmployeeById } from "@/fetch/employee/fetchmployeeById";
import { DeleteGrade } from "../grade/deleteGrade";

export function SendAssessment({ id }) {
  const metric = useStore((state) => state.metrics);
  const grades = useGrade((state) => state.grades);
  const reset = useGrade((state) => state.reset);
  const resetUI = useStore((state) => state.reset);
  const [modal, setModal] = useState(false);
  const [employee, setEmployee] = useState<Employee>(null);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const data = await fetchEmployeeById(id);
      setEmployee(data);
    };
    fetchEmployeeData();
  }, [id]);
  const sendAssessment = async () => {
    try {
      const data = await postNewAssessment(grades, id);
      reset();
      resetUI();
      setModal(true);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return !modal ? (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row gap-3">
        <div>
          <CardTitle>Assessment for {employee ? employee.name : ""}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-col flex justify-around h-fit">
        <AddGrade employee_id={id} />
        <Card className="my-4 w-5/12">
          <CardHeader>
            <CardTitle>Current Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {metric.length !== 0 ? (
              metric.map((item) => (
                <div
                  key={item.metric.metric_id}
                  className="flex justify-evenly gap-4 items-start w-2/5  my-3 p-4 rounded shadow"
                >
                  <div>
                    <p className="text-lg font-semibold">{item.metric.name}</p>
                    <p className="text-base font-sm text-neutral-700">
                      {item.metric.type}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xl"
                      style={{
                        color: calculateColor(item.score),
                      }}
                    >
                      {item.score}
                    </p>
                  </div>
                  <div>
                    <DeleteGrade grade={item} id={id} />
                  </div>
                </div>
              ))
            ) : (
              <p>Sem metricas</p>
            )}
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="float-right"
          onClick={() => sendAssessment()}
        >
          Send assessment
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Note send!</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setModal(false)}>Close</Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
