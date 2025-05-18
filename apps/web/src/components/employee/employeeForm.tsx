import { fetchEmployees } from "@/fetch/employee/fetchEmployees";
import { Button } from "@/repo/ui/components/ui/button";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/repo/ui/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/repo/ui/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/repo/ui/components/ui/popover";
import { cn } from "@/repo/ui/lib/utils";
import { Employee } from "@/types/employee.type";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

//TODO

export function EmployeeForm({ form, t }: { form: UseFormReturn; t?: any }) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        const fetchEmplys = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };
        fetchEmplys();
    }, []);
    return (
        <FormField
            control={form.control}
            name="employee_id"
            defaultValue={[]}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{t("job")}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between text-wrap",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value
                                        ? employees.find(
                                              (employee) =>
                                                  employee.id === field.value,
                                          )?.name
                                        : t("pick_job")}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0 r-0">
                            <Command>
                                <CommandInput placeholder="Search job..." />
                                <CommandList>
                                    <CommandEmpty>{t("no_job")}</CommandEmpty>
                                    <CommandGroup>
                                        {employees.map((employee) => (
                                            <CommandItem
                                                value={employee.name}
                                                key={employee.id}
                                                onSelect={() => {
                                                    form.setValue(
                                                        "employee_id",
                                                        [
                                                            ...form.getValues(
                                                                "employee_id",
                                                            ),
                                                            employee.id,
                                                        ],
                                                    );
                                                }}
                                                className={cn("text-wrap")}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        employee.id ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                {employee.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
