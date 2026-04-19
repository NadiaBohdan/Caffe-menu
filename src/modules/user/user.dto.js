import { z } from 'zod';

export const userCore = z.object({
    firstName: z.string().trim().min(1, 'Enter your real name').max(100),
    lastName: z.string().trim().min(1, 'Enter your real lastname').max(100),
    email: z.email("Invalid email"),
    phoneNumber: z.string().regex(/^\+380\d{9}$/, "Invalid UA number"),
    password: z.string(),
    role: z.enum(['user'])
});

export const createUserDto = userCore;

export const updateUserDto = userCore.partial()

export const identifierDto = z.union([
    userCore.shape.email,
    userCore.shape.phoneNumber
]);
