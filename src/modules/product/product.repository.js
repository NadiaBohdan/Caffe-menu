import prisma from "#configs/prisma.js";

/**
 * @typedef {import('@prisma/client').Product} Product
 * @typedef {import('@prisma/client').File} File
 */

export const productRepository = {
    /**
     * @param {Object} data
     * @param {string} data.title
     * @param {string} data.description
     * @param {number|import('@prisma/client').Prisma.Decimal} data.price
     * @param {number} data.categoryId
     * @param {string} data.fileURL
     * @param {string} data.publicId
     */

    async create(data) {
        const { fileURL = null, publicId = null, ...productData } = data;

        return await prisma.$transaction( async (tx) => {
            let fileId = null;

            if(fileURL && publicId) {
                const { id } = await tx.file.create({
                    data: { fileURL, publicId }
                })

                fileId = id;
            }
            
            const lastProduct = await tx.product.findFirst({
                orderBy: { sortOrder: "desc" },
                select: { sortOrder: true }
            })

            const sortOrder = lastProduct ? lastProduct.sortOrder + 1 : 0;

            const payload = { ...productData, sortOrder };
            if(fileId) payload.fileId = fileId;

            return await tx.product.create({
                data: payload
            })
        })
    },

    /**
     * @param {Object} cursorData
     * @param {number} [cursorData.lastCursor]
     * @param {number} [cursorData.lastId]
     * @param {number} cursorData.limit
     */

    async getByPagination({ lastCursor, limit, lastId }) {
        if(!lastId) {
            return await prisma.product.findMany({
                take: limit,
                orderBy: { sortOrder: "asc" },
                include: { file: true }
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
            },
            include: {
                file: true
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
            where: { categoryId },
            include: { file: true }
        })
    },

    async getById(id) {
        return await prisma.product.findUnique({
            where: { id },
            include: { file: true }
        })
    },

    async deleteFile(id, tx = prisma) {
        return await tx.file.delete({
            where: { id }
        })
    },

    /**
     * @param {Array<Partial<Product> & { fileURL?: string, publicId?: string, fileId?: number, fileToDelete: boolean }>} productArray
     */

    async update(productArray) {
        return await prisma.$transaction(async (tx) => {
            return await Promise.all(
                productArray.map(async ({ id, ...product }) => {
                    const { fileURL, publicId, fileId, fileToDelete, ...productData } = product;

                    if(fileToDelete && fileId) {
                        await this.deleteFile(fileId, tx);
                        productData.fileId = null;
                    }

                    if (fileURL && publicId && fileId && !fileToDelete) {
                        await tx.file.update({
                            where: { id: fileId },
                            data: { fileURL, publicId }
                        });
                    }
                    
                    return tx.product.update({
                        where: { id },
                        data: { ...productData },
                        include: { file: true }
                    });
                })
            );
        });
    },

    /**
     * @param {number} id
     * @returns {Promise<Product>}
     */

    async delete(id) {
        return await prisma.product.delete({
            where: { id }
        })
    }
}