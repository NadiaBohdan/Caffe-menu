import { z } from 'zod';

const userCore = {
    firstName: z.string().trim().min(1, 'Enter your real name').max(100),
    lastName: z.string().trim().min(1, 'Enter your real lastname').max(100),
    email: z.email("Invalid email"),
    phoneNumber: z.string().regex(/^\+380\d{9}$/, "Invalid UA number"),
    password: z.string()
};

export const createUser = z.object(userCore);

export const updateUserDto = z.object(userCore).partial()

export const identifierDto = z.union([
    userCore.email,
    userCore.phoneNumber
])
 
export const userIdDto = z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
});