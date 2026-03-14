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
     * @param {number} id 
     * @returns {Promise<Object|null>}
     */

    async delete(id) {
        return await prisma.category.delete({
            where: { id }
        })
    },

    /**
     * @param {object} data 
     * @param {string} data.title 
     * @param {number} data.sortOrder
     * @param {number} id
     * @returns {Promise<Object|null>}
     */

    async update(data, id) {
        return await prisma.category.update({
            where: { id },
            data: {
                title: data.title,
                sortOrder: data.sortOrder
            }
        })
    }
}