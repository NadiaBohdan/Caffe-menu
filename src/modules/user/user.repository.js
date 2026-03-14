import prisma from "#configs/prisma";

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
     * 
     * @param {string} identifier 
     * @returns {Promise<Object|null>}
     */

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

    /**
     * @param {string} field 
     * @param {string} value 
     * @returns 
     */

    async findByField(field, value) {
        return await prisma.user.findFirst({
            where: { [field]: value }
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
     * @param {Partial<{
     *  firstName: string,
     *  lastName: string,
     *  email: string,
     *  phoneNumber: string,
     *  password: string
     * }>} userData
     * @param {number} id
     * @returns {Promise<Object|null>}
     */

    async update(userData, id) {
        return await prisma.user.update({
            where: { id: id, },
            data: userData
        })
    },

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Object|null>} 
     */

    async delete(id) {
        return await prisma.user.delete({
            where: { id }
        })
    }
}