import prisma from "#configs/prisma.js";

export const userRepository = {

    async findById(id) {
        return await prisma.user.findUnique({
            where: { id }
        })
    },

    async getNameById(id) {
        return prisma.user.findFirst({
            where: { id },
            select: { firstName: true }
        })
    },

    async findByIdentifier(identifier) {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { phoneNumber: identifier }
                ]
            }
        })
    },

    async create(userData) {
        return await prisma.user.create({
            data: {
                ...userData,
                
                favourites: {
                    create: {}
                },
                carts: {
                    create: {}
                }
            }
        })
    },

    async update({ id, ...data }) {
        return await prisma.user.update({
            where: { id },
            data
        })
    },

    async delete(id) {
        return await prisma.user.delete({
            where: { id }
        })
    }
}