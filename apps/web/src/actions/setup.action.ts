'use server'

import { signIn } from "@/auth"

export const signInCredentialsSetup =  async (email:string, password:string) => {
    const res = await signIn('credentials', {
        email,
        password,
    })
    return res
}