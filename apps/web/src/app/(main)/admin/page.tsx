"use client";
import { AddDepartment } from "@/components/department/addDepartment";
import { AddJob } from "@/components/job/addJob";
import { AddMetric } from "@/components/metric/addMetrics";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/repo/ui/components/ui/dialog";
import {
    BarChart,
    Briefcase,
    Building2,
    MonitorCog,
    PlusCircle,
    Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/repo/ui/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/repo/ui/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getUser } from "@/helpers/getUser";
import useSWR from "swr";
import { fetchDepOrgInfo } from "@/fetch/department/fetchDepInfo";
import DepartmentsAdmin from "@/components/department/departmentAdminCard";
import MetricsAdmin from "@/components/metric/metricsAdminCard";
import { isAuthorized } from "@/helpers/isAuthorized";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/errorPage";
import { AdminPageLoader } from "@/components/loaders/adminPage";
import UsersAdmin from "@/components/user/usersAdmin";

export default function Admin() {
    const t = useTranslations("Admin");
    const [activeTab, setActiveTab] = useState("overview");
    const [isAdmin, setIsAdmin] = useState(false);
    const [session, setSession] = useState();
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const session = await getUser();
            setSession(session);
            const isAdmin = await isAuthorized(1);
            setIsAdmin(isAdmin);
            if (!isAdmin) router.back();
        };
        fetchData();
    }, []);

    const {
        data: orgInfo,
        isLoading,
        error,
    } = useSWR("orginfo", fetchDepOrgInfo);

    if (isLoading) return <AdminPageLoader />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!orgInfo)
        return <ErrorMessage message="Org not found or you're not an Admin" />;

    return (
        <main className="container px-4 py-8">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-bold">
                                {t("welcome", { user: session?.name })}
                            </CardTitle>
                            <CardDescription className="text-lg mt-2">
                                {t("description")}
                            </CardDescription>
                        </div>
                        <div className="space-x-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        {t("settings")}{" "}
                                        <MonitorCog className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {t("setup.title")}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6 mt-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">
                                                {t("setup.add_metric")}
                                            </h4>
                                            <AddMetric />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">
                                                {t("setup.add_department")}
                                            </h4>
                                            <AddDepartment />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold">
                                                {t("setup.add_job")}
                                            </h4>
                                            <AddJob />
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button variant="default" className="gap-2">
                                <Link
                                    href="/setup/organization/invite"
                                    className="flex items-center"
                                >
                                    {t("setup.add_users")}
                                    <PlusCircle className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="mt-6"
                    >
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="overview">Geral</TabsTrigger>
                            <TabsTrigger value="departments">
                                Departamentos
                            </TabsTrigger>
                            <TabsTrigger value="metrics">Metricas</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                        </TabsList>
                        {orgInfo.info[0]._count && (
                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Jobs
                                            </CardTitle>
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {orgInfo.info[0]._count.jobs}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Departments
                                            </CardTitle>
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {
                                                    orgInfo.info[0]._count
                                                        .departments
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Active Metrics
                                            </CardTitle>
                                            <BarChart className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {orgInfo.info[0]._count.metrics}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Active Users
                                            </CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-2xl font-bold">
                                                {orgInfo.info[0]._count.members}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        )}
                        <TabsContent value="departments">
                            <DepartmentsAdmin />
                        </TabsContent>
                        <TabsContent value="metrics">
                            <MetricsAdmin />
                        </TabsContent>
                        <TabsContent value="users">
                            <UsersAdmin />
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between items-center mt-6"></CardFooter>
            </Card>
        </main>
    );
}
