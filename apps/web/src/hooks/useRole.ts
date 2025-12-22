"use server"

import { auth } from "@/auth"

export const useRole = async () => {
    const session = await auth()
    if (!session) return null
    return session.user.role
}