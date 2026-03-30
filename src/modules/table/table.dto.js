import { z } from "zod"

const tableCore = z.object({
    id: z.coerce.number().int().positive(),
    tableNumber: z.number().int().nonnegative(),
    isAvailable: z.boolean()
});

export const tableIdDto = tableCore.pick({ id: true });

export const createTableDto = tableCore.pick({ tableNumber: true });

export const updateTableDto = tableCore.omit({ id: true }).partial();

export const updateAvailabilityDto = tableCore.pick({ isAvailable: true });