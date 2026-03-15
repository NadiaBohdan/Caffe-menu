import prisma from "#configs/prisma"

export const tableRepository = {
    /**
     * @param {Object} data
     * @param {number} data.tableNumber
     */

    async create({ tableNumber }) {
        return await prisma.cafeTable.create({
            data: { tableNumber }
        })
    },

    async getAll() {
        return await prisma.cafeTable.findMany()
    },

    /**
     * @param {Object}  data
     * @param {number}  data.tableNumber
     * @param {boolean} data.isAvailable
     * @param {number}  data.id 
     */

    async update({id, ...data}) {
        return await prisma.cafeTable.update({
            where: { id },
            data: data
        })
    },

    /**
     * @param {Object}  data
     * @param {boolean} data.status
     * @param {number}  data.id 
     */

    async setStatus({ id, status }) {
        return await prisma.cafeTable.update({
            where: { id },
            data: { isAvailable: status }
        })
    },

    /**
     * @param {number} id 
     */

    async delete(id) {
        return await prisma.cafeTable.delete({
            where: { id }
        })
    }
}