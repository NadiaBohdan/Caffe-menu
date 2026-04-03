import prisma from "#configs/prisma.js";

export const productRepository = {
    async create(data) {
        return await prisma.$transaction( async (tx) => {
            const lastProduct = await tx.product.findFirst({
                orderBy: { sortOrder: "desc" },
                select: { sortOrder: true }
            })

            const sortOrder = lastProduct ? lastProduct.sortOrder + 1 : 0;

            await tx.product.create({
                data: { ...data, sortOrder}
            })
        })
    },

    async getByPagination({ lastCursor, limit, lastId }) {
        if(!lastId) {
            return await prisma.product.findMany({
                take: limit,
                orderBy: { sortOrder: "asc" }
            })
        }

        return await prisma.product.findMany({
            take: limit,
            skip: 1,
            cursor: {
                sortOrder_id: {
                    sortOrder: lastCursor,
                    id: lastId
                }
            },
            orderBy: {
                sortOrder: "asc"
            }
        })
    },

    async getByTitle(title) {
        return await prisma.product.findUnique({
            where: { title }
        })
    },

    async getById(id) {
        return await prisma.product.findUnique({
            where: { id }
        })
    },

    async update(productArray) {
        return await prisma.$transaction( async (tx) => {
            return await Promise.all(
                productArray.map(( {id, ...product }) => {
                    return tx.product.update({
                        where: { id },
                        data: product
                    })
                })
            )
        })
    },

    async delete(id) {
        return await prisma.product.delete({
            where: { id }
        })
    }
}