import { Button } from "@/repo/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/repo/ui/components/ui/carousel";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/repo/ui/components/ui/tabs";
import { LineChart } from "lucide-react";
import Image from "next/image";
import { JobsCard } from "@/components/job/JobsCard";
import { DepInfoCard } from "@/components/department/departmentsInfoCard";
import { EmployeeRank } from "@/components/employee/employeeRank";
import { CourseCard } from "@/components/course/courseCard";
import { DepartmentChart } from "@/components/department/departmentChart";
import { checkConfig } from "@/helpers/checkconfig";
import { EmployeeChart } from "@/components/employee/employeeChart";
import { auth } from "@/auth";
import { fetchDepOrgInfo } from "@/fetch/department/fetchDepInfo";
import { getTranslations } from "next-intl/server";
import { ManagerChart } from "@/components/manager/managerChart";
import { AllChart } from "@/components/allChart";
import { Metadata } from "next";
import { EmployeeCountChart } from "@/components/employee/employeeCountChart";
import { RecentHires } from "@/components/employee/recentHires";
import useRoleStore from "@/store/role.store";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Pagina principal",
};

export default async function Home() {
    const t = await getTranslations("Dashboard");
    const session = await auth();
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>
                        {t("welcome", { user: session?.user?.name })}
                    </CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}
