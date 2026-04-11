import { z } from "zod"

const contactCore = z.object({
    linkType: z.enum(["phoneNumber", "email", "instagram", "facebook"]),
    name: z.string({ invalid_type_error: "Invalid name" }).trim().min(1, "Name is reqired"),
    link: z.string().trim().min(1, "phone number or link required")
})

export const contactSyncDto = z.array(contactCore);