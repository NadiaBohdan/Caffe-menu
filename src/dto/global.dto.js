import { z } from "zod"

export const idDto = z.object({
    id: z.coerce.number().int().positive()
})

export const strongPassword = z.string()
    .min(8, "Password too small")
    .max(32, "Password too long")
    .regex(/[a-z]/)
    .regex(/[1-9]/)