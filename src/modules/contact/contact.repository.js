import prisma from "#configs/prisma.js";

export const contactRepository = {
    async sync(contactsArray) {
        return await prisma.$transaction( async (tx) => {
            await tx.contact.deleteMany();

            return await Promise.all(
                contactsArray.map( contact => {
                    return tx.contact.create({
                        data: contact
                    })
                })
            )
        })
    }
}