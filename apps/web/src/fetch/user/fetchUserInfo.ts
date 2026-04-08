"use server"

import { auth } from "@/auth"


export const fetchUserInfo = async() => {
    const session = await auth()
    if (!session) return null
    return session.user
}