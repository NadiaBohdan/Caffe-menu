import { z } from "zod"

const categoryCore = z.object({
    id: z.coerce.number().int().positive(),
    title: z.string(),
    sortOrder: z.number().int().nonnegative()
})

export const categoryIdDto = categoryCore.pick({ id: true });

export const createCategoryDto = categoryCore.pick({ title: true });

export const updateCategoriesList = z.array(categoryCore)

