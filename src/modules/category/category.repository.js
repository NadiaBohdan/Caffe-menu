import prisma from "#configs/prisma";

export const categoryRepository = {

    /**
     * @param {string} title 
     * @returns {Promise<Object|null>}
     */

    async create(title) {
        return await prisma.category.create({
            data: { title }
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
     * @param {string} title 
     * @param {number} id 
     * @returns 
     */

    async update(title, id) {
        return await prisma.category.update({
            where: { id },
            data: { title }
        })
    }
}