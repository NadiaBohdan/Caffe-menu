import { z } from "zod"

const categoryCore = {
    title: z.string(),
    sortOrder: z.number().int().nonnegative()
}

export const createCategoryDto = z.object(categoryCore);

export const updateCategoryDto = z.object(categoryCore).partial();

export const categoryIdDto = z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
});