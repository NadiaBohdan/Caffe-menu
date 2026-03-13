import { z } from "zod"
import { userCore, identifierDto } from "#user/user.dto"

const strongPassword = z.string()
    .min(8, "Password too small")
    .max(32, "Password too long")
    .regex(/[a-z]/)
    .regex(/[1-9]/)

export const registerDto = z.object({
    ...userCore,
    password: strongPassword,
    confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
    message: "Password's don't match",
    path: ["confirmPassword"]
})
.transform(data => {
    const { confirmPassword, ...rest } = data;
    return rest;
})

export const loginDto = z.object({
    identifier: identifierDto,
    password: z.string()
})
