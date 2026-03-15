import { z } from "zod"

const tableCore = {
    tableNumber: z.number().int().nonnegative(),
    isAvailable: z.boolean()
}

export const createTableDto = z.object(tableCore);

export const updateTableDto = z.object(tableCore).partial();

export const tableIdDto = z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
})

export const updateStatusDto = tableIdDto.extend({
    status: z.boolean()
})