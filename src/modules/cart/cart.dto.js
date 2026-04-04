import { z } from "zod"

const cartCore = z.object({
    productId: z.coerce.number().int().positive("Id must be bigger than 0"),
    quantity: z.coerce.number().int().min(1, "Quantity can't be less than 1")
})

export const upsertCartDto = cartCore;

export const cartIdDto = z.object({
    id: z.coerce.number().int().positive("Id must be bigger than 0")
})

