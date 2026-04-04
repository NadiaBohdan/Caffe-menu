import prisma from "#configs/prisma.js";

const favouriteRepository = {
    async toggle({favouriteId, productId}) {
        return await prisma.$transaction( async (tx) => {
            const existingItems = await tx.favouriteItems.findUnique({
                where: {
                    favouriteId_productId: { favouriteId, productId }
                }
            })

            if(existingItems) {
                return await tx.favouriteItems.delete({
                    where: { id: existingItems.id }
                })
            }

            return await tx.favouriteItems.create({
                data: {productId, favouriteId}
            })
        })
    },

    async getAll(favouriteId) {
        const items = await prisma.favouriteItems.findMany({
            where: { favouriteId },
            select: {
                product: {
                    include: {
                        file: true
                    }
                }
            }
        })

        return items.map(item => item.product);
    },
    
    async getFavouriteId (userId) {
        return await prisma.favourite.findUnique({
            where: { userId },
            select: { id: true }
        })
    }
}