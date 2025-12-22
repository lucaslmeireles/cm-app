"use client";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/repo/ui/components/ui/form";
import { Department } from "@/types/department.type";
import { useEffect, useState } from "react";

export const SelectDepartments = ({ form, state, fn }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const depData = await fetchDepartments();
      setDepartments(depData);
      setIsLoading(false);
      fn(!state);
    };
    getData();
  }, []);
  return isLoading ? (
    <>
      <div>
        <p>Carregando</p>
      </div>
    </>
  ) : (
    <div>
      <FormField
        control={form.control}
        name="department"
        render={() => (
          <FormItem defaultValue={[]}>
            <div className="mb-4">
              <FormLabel className="text-base">Departments</FormLabel>
              <FormDescription>
                Select the departments this supervisor is part of.
              </FormDescription>
            </div>
            {departments.map((dep) => (
              <FormField
                key={dep.id}
                control={form.control}
                name="department"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={dep.id}
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
                                updatedValue.filter((value) => value !== dep.id)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{dep.name}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
