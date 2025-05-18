import { Card, CardHeader } from "@/repo/ui/components/ui/card";
import { Employee } from "@/types/employee.type";
import { Mail, MapPin, Phone, User } from "lucide-react";

export const EmployeeInfoSensitive = ({ employee }: { employee: Employee }) => {
    //TODO Fazer a funçao de dados sensiveis
    return (
        <Card className="w-4/5">
            <CardHeader className="flex flex-col gap-3 ">
                <h2 className="text-lg font-medium">Informações de contato</h2>
                <p>
                    <Phone />
                    {employee.phone}
                </p>
                {employee.address && (
                    <p>
                        <MapPin /> {employee.address}
                    </p>
                )}
                {employee.email && (
                    <p>
                        <Mail /> {employee.email}
                    </p>
                )}
                {employee.identifiant && (
                    <p>
                        <User /> {employee.identifiant}
                    </p>
                )}
            </CardHeader>
        </Card>
    );
};
