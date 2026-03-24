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

            const newProductArray = await tx.product.findMany( {
                orderBy: { sortOrder: "asc" }
            })

            return newProductArray;
        })
    },

    async getAll() {
        return await prisma.product.findMany({
            orderBy: { sortOrder: "asc" }
        })
    },

    async getById(id) {
        return await prisma.product.findUnique({
            where: { id }
        })
    },

    async update(productArray) {
        return await prisma.$transaction( async (tx) => {
            productArray.map(product => {
                
            })
        })
    }
}