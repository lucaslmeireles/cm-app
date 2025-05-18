import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Passoword must contain 8 characters').max(16, 'Password must have a 16 characters maximum')
})