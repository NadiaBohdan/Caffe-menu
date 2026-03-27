import { z } from "zod"

const tableCore = {
    tableNumber: z.number().int().nonnegative(),
    isAvailable: z.boolean()
}

export const tableIdDto = z.object({
    id: z.coerce.number().int().positive()
}).required()

export const createTableDto = z.object(tableCore).pick({ tableNumber: true });

export const updateTableDto = tableIdDto.extend(tableCore);

export const updateStatusDto = tableIdDto.extend({
    status: z.boolean()
})