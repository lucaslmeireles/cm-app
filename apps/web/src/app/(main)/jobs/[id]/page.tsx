"use client";
import { LevelComponent } from "@/components/course/courseCard";
import { fetchJobById } from "@/fetch/job/fetchJobById";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Job } from "@/types/job.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SelectSeparator } from "@/repo/ui/components/ui/select";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { Edit, Trash } from "lucide-react";
import { EditJob } from "@/components/job/editJob";
import { DeleteJob } from "@/components/job/deleteJob";
export default function ViewEmployee() {
    const params = useParams();
    const {
        data: job,
        isLoading,
        error,
    } = useSWR<Job, Error>(params.id, fetchJobById);
    const t = useTranslations("Job");
    return isLoading ? (
        <main>
            <h2>Carregando...</h2>
        </main>
    ) : (
        <Card className="border-none	shadow-none	">
            <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                    <p>{job?.name}</p>
                    <p
                        className={
                            job?.type == "WhiteColor"
                                ? "bg-blue-700 text-white p-2 rounded w-fit"
                                : "text-blue-700 p-2 rounded border w-fit"
                        }
                    >
                        {job?.type}
                    </p>
                    <div className="flex flex-row">
                        <EditJob job={job} />
                        <DeleteJob job={job} />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium">{t("department")}</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {job?.department ? (
                            job?.department.map((dep) => {
                                return (
                                    <Card
                                        className="py-2 mx-3  flex justify-center"
                                        key={dep.id}
                                    >
                                        <h3 className="">{dep.name}</h3>
                                    </Card>
                                );
                            })
                        ) : (
                            <p>{t("no_department")}</p>
                        )}
                    </div>
                </div>
                <SelectSeparator />
                <div className="flex flex-col">
                    <h3 className="text-lg font-medium">{t("employees")}</h3>
                    <div className="grid grid-cols-5">
                        {job?.employees ? (
                            job.employees.map((employee) => {
                                return (
                                    <Link
                                        key={employee.id}
                                        href={`/employees/${employee.id}`}
                                    >
                                        <Card className=" mx-4 my-2 p-2">
                                            <div className=" flex flex-col justify-between">
                                                <div className="flex flex-row gap-2">
                                                    <Image
                                                        src={
                                                            employee.profile_pic
                                                        }
                                                        alt={employee.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {employee.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="p-2 border w-fit rounded">
                                {t("no_employees")}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-4/6">
                    <div>
                        <h3 className="text-lg font-medium">{t("metrics")}</h3>
                        <p>{t("metrics_description")}</p>
                    </div>
                    <div className="grid grid-cols-3">
                        {job?.metrics ? (
                            job.metrics.map((metric) => {
                                return (
                                    <Card
                                        className="mx-3 my-3 py-2 flex-col flex text-center"
                                        key={metric.id}
                                    >
                                        <p className="font-medium">
                                            {metric.name}
                                        </p>
                                        <p className="font-normal text-slate-600 text-sm">
                                            {metric.type}
                                        </p>
                                    </Card>
                                );
                            })
                        ) : (
                            <p>{t("no_metrics")}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p>{t("org")}</p>
                    <h3 className="font-semibold text-lg text-slate-950">
                        {job.org ? job.org.name : "No organization"}
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
}
