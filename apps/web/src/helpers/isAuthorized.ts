'use server'
import { auth } from "@/auth";

/**
 * Checks if the user is authorized based on their role and the provided number.
 *
 * @param number - Optional number to check if the user is authorized to see
 * @returns {Promise<boolean>} - True if the user is authorized, false otherwise
 */

export const isAuthorized = async (number?: number) => {
    const session = await auth()
    const role = session?.user?.role
    switch (role) {
        case "admin":
            return true;
        case "gerente":
            return number !== undefined && number <= 1;
        case "rh":
            return number !== undefined && number <= 2;
        default:
            return false;
    }
};
