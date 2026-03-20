import prisma from "#configs/prisma";

export const categoryRepository = {

    /**
     * @param {object} data 
     * @param {string} data.title 
     * @param {number} data.sortOrder
     * @returns {Promise<Object|null>}
     */

    async create(data) {
        return await prisma.category.create({
            data: { 
                title: data.title,
                sortOrder: data.sortOrder
            }
        })
    },

    /**
     * @returns {Promise<Object|null>}
     */

    async getAll() {
        return await prisma.category.findMany();
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
     * @returns 
     */

    async getById(id) {
        return await prisma.category.findUnique({
            where: { id }
        })
    },

    /**
     * @param {number} id 
     * @returns {Promise<Object|null>}
     */

    async delete(id) {
        return await prisma.category.delete({
            where: { id }
        })
    },

    /**
     * @param {Array} categoryArray 
     */

    async update(categoryArray) {
        return await prisma.$transaction(
            categoryArray.map(({ id, ...data }) => 
                prisma.category.update({
                    where: { id },
                    data
                })
            )
        );
    }
}