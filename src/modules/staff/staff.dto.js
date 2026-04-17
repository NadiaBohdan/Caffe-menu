import { z } from "zod"
import { strongPassword } from "#dto/global.dto.js"

export const staffCore = z.object({
    login: z.string(),
    password: z.string(),
    role: z.enum(['employee', 'courier', 'admin'])
})

export const createStaffDto = staffCore;

export const updateStaffDto = staffCore.pick({ login: true, password: true }).partial();