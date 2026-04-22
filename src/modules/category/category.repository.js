import prisma from "#configs/prisma.js";

/**
 * @param {import('@prisma/client').Prisma.TransactionClient} [tx]
 */

const findAll = async (tx = prisma) => {
    return await tx.category.findMany({
        orderBy: { sortOrder: 'asc' }
    })
}

export const categoryRepository = {

    /**
     * @param {object} data
     * @param {string} data.title
     */

    async create({ title }) {
        return await prisma.$transaction( async (tx) => {
            const lastCategory = await tx.category.findFirst({
                orderBy: { sortOrder: "desc" },
                select: { sortOrder: true }
            })

            const nextOrder = lastCategory ? lastCategory.sortOrder + 1 : 0

            await tx.category.create({
                data: { 
                    title: title,
                    sortOrder: nextOrder
                }     
            })

            return await findAll(tx)
        })
    },

    async getAll() {
        return await findAll()
    },

    async getFirst() {
        return prisma.category.findFirst({
            orderBy: { sortOrder: 'asc' }
        })
    },

    /**
     * @param {string} title 
     */

    async getByTitle(title) {
        return await prisma.category.findUnique({
            where: { title }
        })
    },

    /**
     * @param {number} id 
     */

    async getById(id) {
        return await prisma.category.findUnique({
            where: { id }
        })
    },

    /**
     * @param {number} id 
     */

    async delete(id) {
        return await prisma.$transaction( async (tx) => {
            await tx.category.delete({
                where: { id }
            })

            return await findAll();
        })
    },

    /**
     * @param {Array} categoryArray 
     */

    async update(categoryArray) {
        return await prisma.$transaction( async (tx) => {
            for(const { id, ...data } of categoryArray) {
                await tx.category.update({
                    where: { id },
                    data
                })
            }

            return await findAll(tx)
        })
    }
}