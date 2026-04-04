import prisma from "#configs/prisma.js";

const getFavouriteId = async (userId, tx = prisma) => {
    return await tx.favourite.findUnique({
        where: { userId }
    })
}

const favouriteRepository = {
    async toggle({userId, productId}) {
        return await prisma.$transaction( async (tx) => {
            const { id } = await getFavouriteId(userId, tx);

            const existingItems = await tx.favouriteItems.findUnique({
                where: {
                    favouriteId_productId: { favouriteId: id, productId }
                }
            })

            if(existingItems) {
                return await tx.favouriteItems.delete({
                    where: { id: existingItems.id }
                })
            }

            return await tx.favouriteItems.create({
                data: {productId, favouriteId: id}
            })
        })
    },

    async getAll(userId) {
        return await prisma.$transaction( async (tx) => {
            const { id } = await getFavouriteId(userId, tx);
            if(!id) return []

            const items = await tx.favouriteItems.findMany({
                where: { favouriteId: id },
                select: {
                    product: {
                        include: {
                            file: true
                        }
                    }
                }
            })

            return items.map(item => item.product);
        })
    }    
}