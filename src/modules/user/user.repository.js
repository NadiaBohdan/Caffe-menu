import prisma from "#configs/prisma.js";

export const userRepository = {

    /**
     * @param {number} id 
     * @returns {Promise<Object|null>}
     */

    async findById(id) {
        return await prisma.user.findUnique({
            where: { id }
        })
    },

    /**
     * @param {string} email 
     * @returns {Promise<Object|null>}
     */

    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        })
    },

    /** 
     * @param {string} phoneNumber 
     * @returns {Promise<Object|null>}
     */

    async findByPhoneNumber(phoneNumber) {
        return await prisma.user.findUnique({
            where: { phoneNumber }
        })
    },

    /**
     * @param {Object} userData
     * @param {string} userData.firstName 
     * @param {string} userData.lastName 
     * @param {string} userData.password 
     * @param {string} userData.email 
     * @param {string} userData.phoneNumber 
     * @returns {Promise<Object>}
     */

    async create(userData) {
        return await prisma.user.create({
            data: userData
        })
    },

    /**
     * @param {Object} userData
     * @param {string} userData.firstName 
     * @param {string} userData.lastName 
     * @param {string} userData.password 
     * @param {string} userData.email 
     * @param {string} userData.phoneNumber 
     * @param {number} id
     * @returns {Promise<Object>}
     */

    async update(userData, id) {
        return await prisma.user.update({
            where: { id: id, },
            data: userData
        })
    }
}