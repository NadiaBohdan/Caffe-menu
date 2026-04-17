import prisma from "#configs/prisma.js"

export const staffRepository = {
    async create(data) {
        return prisma.staff.create({ data })
    },

    async getByLogin(login) {
        return prisma.staff.findUnique({
            where: { login }
        })
    },

    async getAll() {
        return prisma.staff.findMany()
    },

    async update({ id, ...data }) {
        return prisma.staff.update({
            where: { id },
            data
        })
    },

    async delete(id) {
        return prisma.staff.delete({
            where: { id }
        })
    }
}