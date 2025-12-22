"use client";

import { Input } from "@/repo/ui/components/ui/input";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";


import { cn } from "@/repo/ui/lib/utils"

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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/repo/ui/components/ui/sheet";

import { useToast } from "@/repo/ui/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formationSchema } from "@/schema/formation.schema";
import { Button } from "@/repo/ui/components/ui/button";
import { CourseType, FormationType } from "@/types/formation.type";
import { CheckIcon, Pencil } from "lucide-react";
import { useState } from "react";
import { patchFormation } from "@/fetch/formation/patchFormation";


export function EditFormation({formation, mutate}: {formation: FormationType, mutate:any}) {
    const [open, setOpen]  = useState(false)
    const [status, setStatus] = useState("idle");
    const {toast } = useToast();
    const form = useForm<z.infer<typeof formationSchema>>({
        resolver: zodResolver(formationSchema),
    })
    
    async function onSubmit(data: z.infer<typeof formationSchema>) {
        try {
          console.log(formation.employee_id)
            const res = await patchFormation(data, formation.id);
            toast({
                title: "Formation created",
                description: (
                 <>
                 <p>{data.name}</p>
                 <small>{data.type}</small>
                 </>
                ),
            })
            setStatus("success")
            mutate(formation.employee_id)
            form.reset();
            setStatus("idle")
          } catch (e) {
            toast({
              title: "Something went wrong",
              description: e.message,
              variant: "destructive",
            });
            setStatus("error")
          }
    }
    
  const types = Object.values(CourseType)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Pencil/>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Editar qualificação</SheetTitle>
        </SheetHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                        control={form.control}
                        name="name"
                        defaultValue={formation.name}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="type"
                defaultValue={formation.type}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Type</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? types.find(
                                    (type) => type === field.value
                                )?.toString()
                                : "Select tpye"}
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                            />
                            <CommandList>
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                                {types.map((type) => (
                                <CommandItem
                                    value={type}
                                    key={type}
                                    onSelect={() => {
                                    form.setValue("type", type)
                                    }}
                                >
                                    {type}
                                    <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        type === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                    />
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
                <LoadingButton type="submit" status={status}>Editar</LoadingButton>
            </form>
        </Form>
    </SheetContent>
    </Sheet>
  )
}
