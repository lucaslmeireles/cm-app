//TODO CREATE MANAGER HERE
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/repo/ui/components/ui/button";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { useEffect, useState } from "react";
import { postInviteMember } from "@/fetch/user/postInviteMember";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/repo/ui/components/ui/select";

import {PhoneInput} from "@/repo/ui/components/ui/phone-input"

import { useRouter } from "next/navigation";
import { inviteMember } from "@/schema/setup.schema";
import { fetchJobs } from "@/fetch/job/fetchJobs";
import { Job } from "@/types/job.type";
import { useToast } from "@/repo/ui/components/ui/use-toast";

export default function SetupUser() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>();

  useEffect(() => {
    const getData = async () => {
      const jobs = await fetchJobs();
      setJobs(jobs);
      setIsLoading(false);
    };
    getData();
  }, []);

  const form = useForm<z.infer<typeof inviteMember>>({
    resolver: zodResolver(inviteMember),
  });

  const onSubmit = async (data: z.infer<typeof inviteMember>) => {
    try {
      const fetch = await postInviteMember(data);
      console.log(fetch)
      if (fetch.statusCode === 201) {
        toast({
          title: "User created",
          description: fetch.message,
          variant: "default",
        });
      }
    } catch (e) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      form.setError("email", { message: "Email já existe" });
    }
  };

  return isLoading ? (
    <p>Carregando</p>
  ) : (
    <Card className="w-full px-5 py-4 flex flex-col">
      <CardHeader>
        <CardTitle>Add the shop manager or others managers</CardTitle>
        <small className="border w-40 border-black"></small>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
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
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input placeholder="xx/xx/xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
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
                name="job_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the job" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobs.map((job) => {
                          return (
                            <SelectItem key={job.id} value={job.id}>
                              {job.name} <small>{job.type}</small>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"gerente"}>Gerente</SelectItem>
                        <SelectItem value={"supervisor"}>Supervisor</SelectItem>
                        <SelectItem value={"ti"}>T.I</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold py-3">
                Create a temporary password for this user
              </h3>
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
              className="float-end bg-blue-700 hover:bg-blue-400 my-3 py-2"
              type="submit"
            >
              Submit
            </Button>
            <Button className="float-end bg-blue-700 hover:bg-blue-400 my-3 mx-3 py-2"
              type="submit" onClick={()=> router.push("/dashboard")}>Finish</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
