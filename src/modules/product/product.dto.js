import { z } from "zod";

const productCore = {
    title: z.string().min(1, "Too short title"),
    description: z.string().max(500, "Too long description"),
    price: z.coerce.number().positive("Price must be more than 0"),
    discount: z.coerce.number().nonnegative("Discount can't be less than 0").max(100, "Discount can't be more than 100"),
    categoryId: z.coerce.number().int("Id must be integer"),
    isAvailable: z.preprocess(value => value === "true", z.boolean()),
    imgPath: z.string().url("Invalid image URL").nullable().optional()
}

export const productIdDto = z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
});

export const createProductDto = z.object(productCore).omit({ isAvailable: true });

export const updateProductDto = productIdDto.extend(productCore);
