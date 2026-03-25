import { z } from "zod"

const categoryCore = {
    title: z.string(),
    sortOrder: z.number().int().nonnegative()
}

export const categoryIdDto = z.object({
    id: z.coerce.number().int().positive()
});

export const createCategoryDto = z.object(categoryCore).pick({ title: true });

export const updateCategoryDto = categoryIdDto.extend(categoryCore);

