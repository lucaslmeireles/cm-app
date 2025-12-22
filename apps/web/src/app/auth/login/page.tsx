"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/repo/ui/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/repo/ui/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/repo/ui/components/ui/form"
import { Input } from "@/repo/ui/components/ui/input"
import { signInCredentials } from "@/actions/login.action";
import { loginSchema } from "@/schema/login.schema";
import { redirect } from "next/navigation";
import Link from "next/link";

//TODO COLOCAR A VERFICAÇÂO DOS TEXT, EVITAR SQL INJECTION
export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try{
      const res = await signInCredentials(values.email, values.password);
    } catch (error) {
      form.setError("email", {
        type: "value",
        message: "Wrong Credentials",
      } );
      form.setError("password", {
        type: "value",
        message: "Wrong Credentials",
      } );
    }
  }
  const handleForm = async (e: Event) => {
    e.preventDefault();

  };
  return (
    <main className="flex-row bg-white flex justify-end h-dvh lg:bg-[#243881]">
      <div className="flex-col bg-white flex  w-fit lg:w-2/5 items-center h-full pt-40">
        <Card className="w-full max-w-sm mt-3">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Contact the IT department for the login info.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="s@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="default" type="submit">Login</Button>
                {/* <Button type="button" variant={"link"}><Link href={"/setup"}>First access</Link></Button> */}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
