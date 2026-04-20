import { z } from "zod";

const productCore = z.object({
    title: z.string().min(1, "Too short title"),
    description: z.string().max(500, "Too long description"),
    price: z.coerce.number().positive("Price must be more than 0"),
    amount: z.coerce.number().int().positive("Amount must be more than 0"),
    sortOrder: z.coerce.number().int().nonnegative("Invalid sort order"),
    percentDiscount: z.coerce.number().nonnegative("Discount can't be less than 0").max(100, "Discount can't be more than 100").default(0),
    categoryId: z.coerce.number().int("Id must be integer"),
    isAvailable: z.preprocess(value => value === "true", z.boolean()).default(true),
    fileToDelete: z.preprocess(value => value === "true", z.boolean()).default(false)
})

export const createProductDto = productCore.omit({ isAvailable: true, sortOrder: true, fileToDelete: true });

export const updateProductSortDto = z.array(
    z.object({
        id: z.coerce.number().int().positive(),
        sortOrder: z.coerce.number().int().nonnegative()
    })
);

export const updateProductDto = productCore.partial();

export const cursorPaginationDto = z.object({
    lastSortOrder: z.coerce.number().int().nonnegative().optional(),
    lastId: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).default(10)
})

export const fileDto = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine((type) => type.startsWith('image/'), "File must be a photo"),
    size: z.number().max(5 * 1024 * 1024, "File too large"),
    buffer: z.any().refine((buf) => buf instanceof Buffer, "Invalid buffer")
})
