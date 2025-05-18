"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import { AddMetric } from "@/components/metric/addMetrics";
import { AddDepartment } from "@/components/department/addDepartment";
import { AddJob } from "@/components/job/addJob";
import { Button } from "@/repo/ui/components/ui/button";
import { updateConfig } from "@/fetch/org/updateConfig";
export default function Setup() {
    const router = useRouter();
    const handleConfig = async () => {
        const update = await updateConfig();
        router.push("/setup/organization/invite");
    };

    return (
        <main className="">
            <Card>
                <CardHeader>
                    <CardTitle>Time to setup the organization</CardTitle>
                </CardHeader>
                <CardContent className="flex-col gap-8 flex">
                    <Card className="p-4 flex flex-col gap-3">
                        <div className=" flex flex-row justify-between">
                            <h4 className="font-semibold">Step 1</h4>
                            <AddMetric />
                        </div>

                        <h6 className="font-medium text-lg">Setup Metrics</h6>
                        <p className="text-md text-slate-600">
                            Metrics are the key performance indicators that you
                            want to track in your organization
                        </p>
                    </Card>

                    <Card className="p-4 flex flex-col gap-3">
                        <div className=" flex flex-row justify-between">
                            <h4 className="font-semibold ">Step 2</h4>
                            <AddDepartment />
                        </div>

                        <h6 className="font-medium text-lg">
                            Setup Departments
                        </h6>
                        <p className="text-md text-slate-600">
                            Departments, is how your team is divided
                        </p>
                    </Card>

                    <Card className="p-4 flex flex-col gap-3">
                        <div className=" flex flex-row justify-between">
                            <h4 className="font-semibold text-xg">Step 3</h4>
                            <AddJob />
                        </div>

                        <h6 className="font-medium text-lg">Setup Jobs</h6>
                        <p className="text-md text-slate-600">
                            Jobs is how your team is spreadout in the
                            organization
                        </p>
                    </Card>
                </CardContent>

                <Button
                    onClick={() => handleConfig()}
                    className="float-end m-4"
                >
                    Finish
                </Button>
            </Card>
        </main>
    );
}
