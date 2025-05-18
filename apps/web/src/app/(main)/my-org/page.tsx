import { DepartmentCard } from "@/components/department/DepartmentCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/repo/ui/components/ui/card";

export default function MyOrg() {
    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Organização ACME</CardTitle>
                <CardDescription>Detalhes da organização</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row space-x-5">
                <DepartmentCard />
                <Card>
                    <CardHeader>
                        <CardTitle className="font-medium">Métricas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Detalhes das métricas</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-medium">Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Detalhes dos usuários</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-medium">Cargos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Detalhes dos cargos</CardDescription>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
