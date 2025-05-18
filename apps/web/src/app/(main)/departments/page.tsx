import { AddDepartment } from "@/components/department/addDepartment";
import { DeleteDepartment } from "@/components/department/deleteDepartment";
import { EditDepartment } from "@/components/department/editDepartment";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Department } from "@/types/department.type";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function ViewAllDepartments() {
    const t = await getTranslations("Department");
    const departments: Department[] = await fetchDepartments();

    return (
        <Card className="border-none	shadow-none	">
            <CardHeader>
                <CardTitle className="flex flex-row gap-2  justify-between place-items-center">
                    <p>{t("title")}</p>
                    <p>TIRAR</p>
                    <AddDepartment />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {departments?.map((department) => {
                    return (
                        <div
                            className="border-b-2 flex row w-4/12 justify-around p-3"
                            key={department.id}
                        >
                            <div>
                                <Link href={"departments/" + department.id}>
                                    <p className="text-black font-semibold">
                                        {department.name}
                                    </p>
                                    <p>Stats</p>
                                    {department._count ? (
                                        <>
                                            <small>
                                                {t("n_employees", {
                                                    number: department._count
                                                        .employees,
                                                })}
                                            </small>
                                            <small>
                                                {t("n_jobs", {
                                                    number: department._count
                                                        .jobs,
                                                })}
                                            </small>
                                            <small>
                                                {t("n_metrics", {
                                                    number: department._count
                                                        .metrics,
                                                })}
                                            </small>
                                        </>
                                    ) : (
                                        <small>{t("no_data")}</small>
                                    )}
                                </Link>
                            </div>
                            <div className="flex flex-row p-2 justify-center align-middle items-center">
                                <p>TIRAR</p>
                                <EditDepartment department={department} />
                                <DeleteDepartment department={department} />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
