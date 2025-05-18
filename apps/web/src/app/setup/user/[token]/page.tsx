"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { Calendar } from "@/repo/ui/components/ui/calendar";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { fetchToken } from "@/fetch/user/fetchToken";
import { useForm } from "react-hook-form";
import { passwordSchema } from "@/schema/setup.schema";
import { Button } from "@/repo/ui/components/ui/button";
import { PhoneInput } from "@/repo/ui/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/repo/ui/components/ui/form";
import { Input } from "@/repo/ui/components/ui/input";
import { HandlePassword } from "@/app/(main)/admin/promote/[id]/page";
import Image from "next/image";
import { completeProfile } from "@/schema/employee.schema";

import { updateMe } from "@/fetch/employee/updateMe";
import { signOut } from "@/auth";
import { Logout } from "@/actions/logout.action";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/repo/ui/components/ui/popover";
import { cn } from "@/repo/ui/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown, Circle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BirthdayControl } from "@/components/employee/birthdayControl";
import { EntryControl } from "@/components/employee/entryControl";

export default function Setup() {
  const { token } = useParams();
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchToken(token);
      console.log(res);
      setData(res);
      setIsLoading(false);
    };
    getData();
  }, []);

  const form = useForm<z.infer<typeof completeProfile>>({
    resolver: zodResolver(completeProfile),
  });

  const onSubmit = async (value: z.infer<typeof completeProfile>) => {
    const fetch = await updateMe(value);
    console.log(fetch);
    if (fetch.statusCode === 200) {
      Logout();
    }
    if (fetch.statusCode === 400) {
      form.setError("password", { message: fetch.message });
    }
  };

  return isLoading ? (
    <p>Carregando</p>
  ) : (
    <main className="flex">
      <div className="bg-main w-2/5 flex flex-col">
        <div className="float-left">
          <Image src="/image.png" alt="logo" width={100} height={100} />
        </div>
        <div className="m-auto">
          <h2 className="text-xl font-medium text-left  text-white">
            Welcome to
          </h2>
          <h2 className="text-2xl font-bold text-center text-white">
            {data.user.org.name}
          </h2>
        </div>
      </div>
      <Card className="w-full px-5 py-4 flex flex-col">
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
          <small className="border w-40 border-black"></small>
        </CardHeader>
        <CardContent className="h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={data.employee.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  defaultValue={data.user.email}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="myemail@mydomain.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="register"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Register</FormLabel>
                      <FormControl>
                        <Input placeholder="99xxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="identifiant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifiant</FormLabel>
                      <FormControl>
                        <Input placeholder="99xxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*Reciveid String expected DATE*/ }                
                <FormField
                  control={form.control}
                  name="birthday"
                  defaultValue={new Date(data.employee.birthday)}
                  render={({ field }) => {
                    return <BirthdayControl field={field}/>
                  }}
                />
                <FormField
                  control={form.control}
                  name="entry_date"
                  render={({ field }) => {
                    return <EntryControl field={field}/>
                  }}
                />
              </div>
              <Card className="my-3">
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street, 123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    defaultValue={data.employee.phone}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <PhoneInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone 2</FormLabel>
                        <FormControl>
                          <PhoneInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <h3 className="text-lg font-semibold py-3">
                Change the password to some more safe.
              </h3>
              <div className="grid grid-cols-2 gap-4 my-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="float-end bg-blue-700 hover:bg-blue-400"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
