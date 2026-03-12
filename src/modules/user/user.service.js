import { userCore, userIdDto, updateUserDto, identifierDto} from "./user.dto.js"
import { userRepository } from "./user.repository.js" 

const sanitizeUser = (userData) => {
    const {password, ...userWithoutPassword} = userData;
    return userWithoutPassword;
}

export const userService = {
    
    /**
     * @param {Object} rawUserData 
     */

    async createUser(rawUserData) {
        const userData = userCore.parse(rawUserData);

        const isExistEmail = await userRepository.findByField('email', userData.email);
        if(isExistEmail) throw new Error("User with same email already exists");

        const isExistPhoneNumber = await userRepository.findByField('phoneNumber', userData.phoneNumber);
        if(isExistPhoneNumber) throw new Error("user with same phone number already exists");

        const newUser = await userRepository.create(userData);
        if(!newUser) throw new Error("Create error");

        return sanitizeUser(newUser);
    },

    /**
     * Get user data by email or phone number
     * @param {string} identifier 
     */

    async getUserByIdentifier(identifier) {
        identifierDto.parse(identifier);

        const user = await userRepository.findByIdentifier(identifier);
        if(!user) throw new Error("User not found");

        return user;
    },

    /**
     * @param {string} userId
     */

    async getUserById(userId) {
        const { id } = userIdDto.parse({ id: userId });

        const user = await userRepository.findById(id);
        if(!user) return null;

        return sanitizeUser(user);
    },

    /**
     * @param {Partial<{
     *  firstName: string,
     *  lastName: string,
     *  email: string,
     *  phoneNumber: string,
     *  password: string
     * }>} rawUserData
     * @param {number} userId
     */

    async updateUser(rawUserData, userId) {
        const { id } = userIdDto.parse({ id: userId })
        const userData = updateUserDto.parse(rawUserData);
        
        const updatedUser = await userRepository.update(userData, id);
        if(!updatedUser) throw new Error("User not found");

        return sanitizeUser(updatedUser);
    },

    async deleteUser(userId) {
        const { id } = userIdDto.parse({ id: userId });

        const deletedUser = await userRepository.delete(id);
        if(!deletedUser) throw new Error("User not found");

        return sanitizeUser(deletedUser);
    }
}