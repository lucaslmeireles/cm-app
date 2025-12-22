import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/repo/ui/components/ui/form";
import { Department } from "@/types/department.type";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export function DepartmentForm({ form, t }: { form: UseFormReturn; t?: any }) {
    const [deps, setDeps] = useState<Department[]>([]);
    useEffect(() => {
        const fetchDeps = async () => {
            const data = await fetchDepartments();
            setDeps(data);
        };
        fetchDeps();
    }, []);
    return (
        <FormField
            control={form.control}
            name="departments"
            defaultValue={[]}
            render={() => (
                <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">
                            {t("department")}
                        </FormLabel>
                    </div>
                    {deps.map((dep) => (
                        <FormField
                            key={dep.id}
                            control={form.control}
                            name="departments"
                            render={({ field }) => {
                                return (
                                    <FormItem
                                        defaultValue={[]}
                                        key={dep.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(
                                                    dep.id,
                                                )}
                                                onCheckedChange={(checked) => {
                                                    const updatedValue =
                                                        field.value || [];
                                                    if (checked) {
                                                        field.onChange([
                                                            ...updatedValue,
                                                            dep.id,
                                                        ]);
                                                    } else {
                                                        field.onChange(
                                                            updatedValue.filter(
                                                                (value) =>
                                                                    value !==
                                                                    dep.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {dep.name}
                                        </FormLabel>
                                    </FormItem>
                                );
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
