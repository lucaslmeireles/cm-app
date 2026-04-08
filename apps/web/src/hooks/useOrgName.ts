"use server"

import { auth } from "@/auth"

export const useOrgName = async () => {
    const session = await auth()
    if (!session) return null
    return session.user.org
}