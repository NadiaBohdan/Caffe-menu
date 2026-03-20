import prisma from "#configs/prisma";

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

            const newCategoriesArray = await tx.category.findMany({
                orderBy: { sortOrder: "asc" }
            })

            return newCategoriesArray;
        })
    },

    async getAll() {
        return await prisma.category.findMany({
            orderBy: { sortOrder: "asc" }
        });
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

            const newCategoriesArray = await tx.category.findMany({
                orderBy: { sortOrder: "asc" }
            })

            return newCategoriesArray;
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

            const newCategoriesArray = await tx.category.findMany({
                orderBy: { sortOrder: "asc" }
            })

            return newCategoriesArray;
        })
    }
}