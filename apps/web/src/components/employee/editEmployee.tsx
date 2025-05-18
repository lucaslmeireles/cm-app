"use client";

import { Button } from "@/repo/ui/components/ui/button";
import { Input } from "@/repo/ui/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/repo/ui/components/ui/sheet";

import { cn } from "@/repo/ui/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/repo/ui/components/ui/form";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/repo/ui/components/ui/popover"


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/repo/ui/components/ui/command"


import { useToast } from "@/repo/ui/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchJobs } from "@/fetch/job/fetchJobs";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { Department } from "@/types/department.type";
import { Job } from "@/types/job.type";
import { patchEmployee } from "@/fetch/employee/patchEmployee";
import { Check, ChevronsUpDown, Circle, Edit, UserPen } from "lucide-react";
import { Employee } from "@/types/employee.type";
import { editEmployeeForm } from "@/schema/employee.schema";
import { PhoneInput } from "@/repo/ui/components/ui/phone-input";
import { BirthdayControl } from "./birthdayControl";
import { EntryControl } from "./entryControl";
import { mutate } from "swr";
import { useTranslations } from "next-intl";

export function EditEmployee({ employee }: { employee: Employee }) {
  const t = useTranslations("Employee.Add");
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [deps, setDeps] = useState<Department[]>([]);
  const form = useForm<z.infer<typeof editEmployeeForm>>({
    resolver: zodResolver(editEmployeeForm),
  });

  useEffect(() => {
    const getData = async () => {
      const jobsF = await fetchJobs();
      setJobs(jobsF);
      const depsF = await fetchDepartments();
      setDeps(depsF);
      employee.department && form.reset({
        departments: [
          ...(employee.department?.map((dep) => dep.id)),
        ],
      });
    };
    getData();
  }, []);


  const onSubmit = async (values: z.infer<typeof editEmployeeForm>) => {
    console.log(values, employee.id)
    const data = await patchEmployee(values, employee.id);
    if (data.statusCode !== 201) {
      toast({
        title: "Something went wrong",
        description: data.message,
        variant: "destructive",
      });
    }
    toast({
      title: `Funcionário foi editado`,
      description: <>
      <p>{data.name}</p>
      </>
    });
    mutate(employee.id)
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <UserPen />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>{t("title_edit")}</SheetTitle>
          <SheetDescription>{t("description_edit")}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                defaultValue={employee.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                        defaultValue={employee.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        defaultValue={employee.email}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TODO Adicionar verficiação de matricula */}
              <FormField
                control={form.control}
                name="register"
                defaultValue={employee.register}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register")}</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


          <FormField
                control={form.control}
                name="identifiant"
                defaultValue={employee.identifiant}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifiant</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="phone"
                defaultValue={employee.phone}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")}</FormLabel>
                    <FormControl>
                    <PhoneInput {...field} defaultValue={employee.phone}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone2"
                defaultValue={employee.phone2 || undefined}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone2")}</FormLabel>
                    <FormControl>
                    <PhoneInput {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("address")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="address"
                        {...field}
                        defaultValue={employee.address}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="birthday"
                  defaultValue={new Date(employee.birthday)}
                  render={({ field }) => {
                    return <BirthdayControl field={field}/>
                  }}
                />
                <FormField
                  control={form.control}
                  name="entry_date"
                  defaultValue={new Date(employee.entry_date)}
                  render={({ field }) => {
                    return <EntryControl field={field}/>
                  }}
                />
              <FormField
              control={form.control}
              name="job_id"
              defaultValue={employee.job_id}
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
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? jobs.find(
                                (job) => job.id === field.value
                              )?.name
                            : "Select job"}
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
                            {jobs.map((job) => (
                              <CommandItem
                                value={job.name}
                                key={job.id}
                                onSelect={() => {
                                  form.setValue("job_id", job.id)
                                }}
                                className={cn("text-wrap")}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    job.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {job.name} <Circle fill={(job.type === "BlueCollar") ? "blue" : "" } size={10} className="ml-2" strokeWidth={0}/>
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
              <FormField
                control={form.control}
                name="departments"
                render={() => (
                  <FormItem
                    defaultValue={employee.department?.map((dep) => dep.id)}
                  >
                    <div className="mb-4">
                      <FormLabel className="text-base">{t("department")}</FormLabel>
                    </div>
                    {deps.length > 0 ? deps.map((dep) => (
                      <FormField
                        key={dep.id}
                        control={form.control}
                        name="departments"
                        
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={dep.id}
                              defaultValue={[]}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(dep.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = field.value || [];
                                    if (checked) {
                                      field.onChange([...updatedValue, dep.id]);
                                    } else {
                                      field.onChange(
                                        updatedValue.filter(
                                          (value) => value !== dep.id
                                        )
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
                    )) : <p>{t("no_department")}</p>}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{t("btn_edit")}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

//TODO CRIAR AGORA O MANAGERS
