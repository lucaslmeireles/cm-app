import { AddJob } from "@/components/job/addJob";
import { CardForJob } from "@/components/job/JobsCard";
import { fetchJobs } from "@/fetch/job/fetchJobs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { Job } from "@/types/job.type";
import { getTranslations } from "next-intl/server";

export default async function ViewAllJobs() {
    const jobs: Job[] = await fetchJobs();
    const t = await getTranslations("Job");
    return (
        <Card className="border-none	shadow-none	">
            <CardHeader>
                <CardTitle className="flex flex-row gap-2  justify-between place-items-center">
                    <p>{t("title")}</p>
                    <AddJob />
                </CardTitle>
            </CardHeader>
            <CardContent className=" w-5/6 flex flex-col ">
                <div className="flex flex-col gap-3">
                    {jobs?.map((job) => {
                        return (
                            <CardForJob
                                name={job.name}
                                employees={job.employees}
                                count={job._count}
                                key={job.id}
                                type={job.type}
                                large={false}
                                id={job.id}
                            />
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
