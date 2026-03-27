import { createUser, userIdDto, updateUserDto, identifierDto} from "./user.dto.js"
import { userRepository } from "./user.repository.js"
import { ApiError } from "#utils/error.util"; 

const sanitizeUser = (userData) => {
    const {password, ...userWithoutPassword} = userData;
    return userWithoutPassword;
}

export const userService = {
    
    /**
     * @param {Object} rawUserData 
     */

    async createUser(rawUserData) {
        const userData = createUser.parse(rawUserData);

        const isExistEmail = await userRepository.findByField('email', userData.email);
        if(isExistEmail) throw new ApiError(409, "User with same email already exists");

        const isExistPhoneNumber = await userRepository.findByField('phoneNumber', userData.phoneNumber);
        if(isExistPhoneNumber) throw new ApiError(409, "user with same phone number already exists");

        const newUser = await userRepository.create(userData);
        if(!newUser) throw new ApiError(500, "Create error");

        return sanitizeUser(newUser);
    },

    /**
     * Get user data by email or phone number
     * @param {string} identifier 
     */

    async getUserByIdentifier(identifier) {
        identifierDto.parse(identifier);

        const user = await userRepository.findByIdentifier(identifier);
        if(!user) throw new ApiError(404, "User not found");

        return user;
    },

    /**
     * Find user data by email or phone number
     * @param {string} identifier 
     */

    async findUserByIdentifier(identifier) {
        identifierDto.parse(identifier);

        const user = await userRepository.findByIdentifier(identifier);

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

        if(userData.phoneNumber || userData.email) {
            const isExistingUserByEmail = await userRepository.findByIdentifier(userData.email);
            if(isExistingUserByEmail && isExistingUserByEmail.id !== userId) throw new ApiError(409, "This email is already taken");

            const isExistingUserByPhoneNumber = await userRepository.findByIdentifier(userData.phoneNumber);
            if(isExistingUserByPhoneNumber && isExistingUserByPhoneNumber.id !== userId) throw new ApiError(409, "This phone number is already taken");
        }
        
        const updatedUser = await userRepository.update(userData, id);
        if(!updatedUser) throw new ApiError(404, "User not found");

        return sanitizeUser(updatedUser);
    },

    /**
     * @param {string} userId 
     * @returns 
     */

    async deleteUser(userId) {
        const { id } = userIdDto.parse({ id: userId });

        const deletedUser = await userRepository.delete(id);
        if(!deletedUser) throw new ApiError(404, "User not found");

        return sanitizeUser(deletedUser);
    }
}