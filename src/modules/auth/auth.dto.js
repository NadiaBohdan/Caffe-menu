import { z } from "zod"
import { userCore, identifierDto } from "#user/user.dto.js"
import { staffCore } from "#staff/staff.dto.js";
import { strongPassword } from "#dto/global.dto.js";

export const registerDto = userCore.extend({
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

export const loginUserDto = z.object({
    identifier: identifierDto,
    password: z.string()
})

export const loginStaffDto = staffCore.pick({ login: true }).extend({
    password: strongPassword
})

