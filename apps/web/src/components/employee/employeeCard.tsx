"use client";
import { fetchEmployeeById } from "@/fetch/employee/fetchmployeeById";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const EmployeeCard = ({
  id,
  dep,
}: {
  id: string;
  dep?: boolean | false;
}) => {
  const t = useTranslations("Employee.Add")
  const [employee, setEmployee] = useState<Employee>();
  const [isLoading, setIsLoading] = useState(true);


  //TODO Tirei o SWR daqui, buscar saber se isso afeta ou não
  useEffect(() => {
    const getData = async () => {
      const employeeData = await fetchEmployeeById(decodeURIComponent(id));
      setEmployee(employeeData);
      setIsLoading(false);
    };
    getData();
  }, [id]);

  return isLoading ? (
    <>
      <Card className={`w-full h-full px-2 mr-4`}>
        <CardHeader className="flex flex-col items-center">
          <Image
            src={employee?.profile_pic}
            width={75}
            height={75}
            className="rounded-full"
            alt="profile-pic"
          />
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Identifian</p>
            <p className="text-base font-normal">Loading...</p>
            <p className="font-semibold text-sm">Entry Date</p>
            <p className="text-base font-normal">Loading...</p>
            <p className="font-semibold text-sm">Birthday</p>
            <p className="text-base font-normal">Loading...</p>
            <p className="font-semibold text-sm">Job</p>
            <p className="text-base font-normal">Loading...</p>
            <p className="font-semibold text-sm">Score</p>
            <p className="text-base font-normal">Loading...</p>
          </div>
        </CardContent>
      </Card>
    </>
  ) : (
    <Card className="w-full h-full px-2 mr-4">
      <CardHeader
        className={`flex flex-${dep ? "row" : "col"} gap-1 relative`}
      >
        <Button className="absolute top-2 right-1" variant="expandIcon" Icon={ExternalLink} iconPlacement="right">
          <Link href={`http://b1067574.inetpsa.com:84/app/dossier/${employee?.identifiant}`} target="_blank">
            Ver faltas
          </Link>
        </Button>
        <Image
          src={employee?.profile_pic}
          width={75}
          height={75}
          className="rounded-full"
          alt="profile-pic"
        />
        <CardTitle>{employee?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {!dep && (
            <>
              <p className="font-semibold text-sm">Identifiant</p>
              <p className="text-base font-normal">{employee?.identifiant}</p>
              <p className="font-semibold text-sm">{t("entry_date")}</p>
              <p className="text-base font-normal">
                {new Date(employee?.entry_date).toLocaleDateString("pt-BR")}
              </p>
              <p className="font-semibold text-sm">{t("birthday")}</p>
              <p className="text-base font-normal">
                {new Date(employee?.birthday).toLocaleDateString("pt-BR")}
              </p>
              <p className="font-semibold text-sm">{t("job")}</p>
              <p className="text-base font-normal">
                {employee?.job?.name ? employee?.job?.name : t("no_job")}
              </p>
            </>
          )}
           <>
              <p className="font-semibold text-sm">{t("department")}</p>
              <p className="text-base font-normal">
                {employee?.department?.length > 0 ? employee?.department?.map((dep) => dep.name).join(", ") : t("no_department")}
              </p>
            </>

        </div>
      </CardContent>
    </Card>
  );
};
