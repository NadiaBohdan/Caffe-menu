import { z } from "zod";

const favoriteCore = z.object({
    productId: z.coerce.number().int().positive("Id must be bigger than 0")
})

export const toggleDto = favoriteCore;