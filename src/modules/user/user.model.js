import { z } from 'zod'

export const createUserSchema = z.object({
    fullName: z.string()
        .min(4, 'Enter your real name')
        .max(100, 'Enter your real name'),

    password: z.string()
        .min(6, "Too short password")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[A-Z]/, "Password must contain at least one big letter")
        .regex(/[a-z]/, "Password must contain at least one small letter"),
    
    phoneNumber: z.string()
        .regex(/^\+380\d{9}$/),
    
    role: z.enum(['user', 'admin', 'employee'])
})

export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
})