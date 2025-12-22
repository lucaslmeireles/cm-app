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
import { setupSchema } from "@/schema/setup.schema";
import { Card } from "@/repo/ui/components/ui/card";
import { postNewSuperUser } from "@/fetch/user/postSuperUser";
import { useState } from "react";
import { signInCredentialsSetup } from "@/actions/setup.action";
import { useRouter } from "next/navigation";
import { HandlePassword } from "@/components/user/HandlePassword";

export default function Setup() {
    const [nextPage, setNextPage] = useState(0);
    const router = useRouter();

    const formCreateOrg = useForm<z.infer<typeof setupSchema>>({
        resolver: zodResolver(setupSchema),
    });

    async function onSubmit(values: z.infer<typeof setupSchema>) {
        try {
            const res = await postNewSuperUser(values);
            await signInCredentialsSetup(values.email, values.password);
            router.push("setup/organization");
        } catch (e) {
            console.log(e); //TODO deu erro nessa parte, identificar porque
        }
    }

    return (
        <main className="flex flex-1 justify-center h-screen items-center bg-main bg-opacity-60">
            {nextPage <= 0 && (
                <Card className="w-6/12 h-fit p-5">
                    <h1 className="font-bold text-center py-3 text-xl">
                        Welcome to the CM
                    </h1>
                    <p className="font-semibold text-LG py-2">
                        Lets create our organization
                    </p>
                    <h2 className="font-medium text-base py-2">
                        Start by creating the super user
                    </h2>
                    <Form {...formCreateOrg}>
                        <form
                            onSubmit={formCreateOrg.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={formCreateOrg.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="s@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formCreateOrg.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Remember this password.
                                        </FormDescription>
                                        <FormMessage />
                                        <HandlePassword form={formCreateOrg} />
                                    </FormItem>
                                )}
                            />
                            <h2 className="font-medium text-base py-2">
                                Time to create your organization
                            </h2>
                            <FormField
                                control={formCreateOrg.control}
                                name="org_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="my organization"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formCreateOrg.control}
                                name="image"
                                render={({
                                    field: { value, onChange, ...fieldProps },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fieldProps}
                                                placeholder="Organization Logo"
                                                type="file"
                                                accept="image/*, application/pdf"
                                                onChange={(event) =>
                                                    onChange(
                                                        event.target.files &&
                                                            event.target
                                                                .files[0],
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                            <Button
                                onClick={() =>
                                    router.push("setup/organization")
                                }
                            >
                                +1
                            </Button>
                        </form>
                    </Form>
                </Card>
            )}
        </main>
    );
}
