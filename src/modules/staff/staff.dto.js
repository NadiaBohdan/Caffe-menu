import { z } from "zod"
import { strongPassword } from "#dto/global.dto.js"

export const staffCore = z.object({
    firstName: z.string().trim().min(1, 'Enter real name').max(100),
    lastName: z.string().trim().min(1, 'Enter real lastname').max(100),
    login: z.string(),
    password: z.string(),
    role: z.enum(['employee', 'courier', 'super'])
})

export const createStaffDto = staffCore;

export const updateUserDto = staffCore.pick({ login: true, password: true }).partial();