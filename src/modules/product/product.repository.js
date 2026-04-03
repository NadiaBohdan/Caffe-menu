import prisma from "#configs/prisma.js";

export const productRepository = {
    async create(data) {
        const { fileURL, publicId, ...productData } = data;

        return await prisma.$transaction( async (tx) => {
            const { id } = await tx.file.create({
                data: { fileURL, publicId }
            })

            const lastProduct = await tx.product.findFirst({
                orderBy: { sortOrder: "desc" },
                select: { sortOrder: true }
            })

            const sortOrder = lastProduct ? lastProduct.sortOrder + 1 : 0;

            return await tx.product.create({
                data: { ...productData, sortOrder, fileId: id}
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

    async getByCategory(categoryId) {
        return await prisma.product.findMany({
            where: { categoryId }
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
                productArray.map( async ( {id, ...product }) => {
                    const { fileURL, publicId, fileId, ...productData } = product;

                    if(fileURL && publicId && fileId) {
                        const fileData = await tx.file.update({
                            where: { id: fileId },
                            data: { fileURL, publicId }
                        })

                        productData.fileId = fileData.id
                    }
                    
                    return tx.product.update({
                        where: { id },
                        data: productData
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