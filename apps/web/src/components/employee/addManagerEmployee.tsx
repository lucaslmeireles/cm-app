"use client";
import { fetchManagers } from "@/fetch/managers/fetchManagers";
import { Button } from "@/repo/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/repo/ui/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FancyMultiSelect } from "@/repo/ui/components/ui/fancy-select";
import { postAttachEmployee } from "@/fetch/managers/attachEmployee";
import { Employee } from "@/types/employee.type";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { isAuthorized } from "@/helpers/isAuthorized";

type Data = {
    value: string;
    label: string;
};

export const AddManagerEmployee = ({
    employee,
    mutate,
}: {
    employee: Employee;
    mutate: any;
}) => {
    const [managers, setManagers] = useState<Data[]>();
    const [selected, setSelected] = useState<Data[]>();
    const [status, setStatus] = useState("idle");
    const [isAdmin, setIsAdmin] = useState(false);
    const { toast } = useToast();
    const onSubmit = async () => {
        try {
            if (selected?.length === 0) {
                toast({
                    title: "Selecione pelo menos um supervisor",
                    variant: "destructive",
                });
                setStatus("error");
                return;
            }
            setStatus("loading");
            const res = await postAttachEmployee({
                employee_id: employee.id,
                user_id: selected?.map((item) => item.value),
            });
            console.log(res);
            mutate(employee.id);
            setStatus("success");
        } catch (e) {
            console.error(e);
            setStatus("error");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchManagers();
            const result = data.map((item) => ({
                label: item.employee.name,
                value: item.user_id,
            }));
            setManagers(result);
        };
        const checkAuthorization = async () => {
            try {
                const authorized = await isAuthorized(2);
                setIsAdmin(authorized);
            } catch (error) {
                console.error("Error checking authorization:", error);
                setIsAdmin(false);
            }
        };

        checkAuthorization();
        fetchData();
    }, []);

    return (
        <Dialog>
            <DialogTrigger>
                <Button disabled={isAdmin}>
                    Adicionar supervisores <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="py-5 h-8/12">
                <DialogHeader>
                    <DialogTitle>Atribuir supervisores</DialogTitle>
                </DialogHeader>
                <FancyMultiSelect
                    data={managers}
                    state={selected}
                    fn={setSelected}
                />
                <LoadingButton
                    status={status}
                    onClick={() => onSubmit()}
                    className="w-full"
                >
                    Adicionar supervisores
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
};
