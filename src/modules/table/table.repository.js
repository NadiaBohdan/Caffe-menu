import prisma from "#configs/prisma"

export const tableRepository = {
    /**
     * @param {Object} data
     * @param {number} data.tableNumber
     */

    async create({ tableNumber }) {
        return await prisma.$transaction( async (tx) => {
            await tx.cafeTable.create({
                data: { tableNumber }
            })

            const newTablesArray = await tx.cafeTable.findMany({
                orderBy: { tableNumber: "asc" }
            })

            return newTablesArray;
        })
    },

    async getAll() {
        return await prisma.cafeTable.findMany({
            orderBy: { tableNumber: "asc" }
        })
    },

    async getByTableNumber({ tableNumber }) {
        return await prisma.cafeTable.findFirst({
            where: { tableNumber }
        })
    },

    /**
     * @param {Object}  data
     * @param {number}  data.tableNumber
     * @param {boolean} data.isAvailable
     * @param {number}  data.id 
     */

    async update({id, ...data}) {
        return await prisma.$transaction( async (tx) => {
            await tx.cafeTable.update({
                where: { id },
                data: data
            })

            const newTablesArray = await tx.cafeTable.findMany({
                orderBy: { tableNumber: "asc" }
            })

            return newTablesArray;
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
        return await prisma.$transaction( async (tx) => {
            await tx.cafeTable.delete({
                where: { id }
            })

            const newTablesArray = await tx.cafeTable.findMany({
                orderBy: { tableNumber: "asc" }
            })

            return newTablesArray;
        })
    }
}