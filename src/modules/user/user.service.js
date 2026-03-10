import { createUserSchema, updateUserSchema, emailSingleSchema, phoneNumberSingleSchema, userIdSchema } from "./user.model.js"
import { userRepository } from "./user.repository.js" 

export const userService = {
    
    /**
     * @param {Object} rawUserData 
     */

    async createUser(rawUserData) {
        const userData = createUserSchema.parse(rawUserData);

        const isExistEmail = await userRepository.findByEmail(userData.email);
        if(isExistEmail) throw new Error("User with same email already exists");

        const isExistPhoneNumber = await userRepository.findByPhoneNumber(userData.phoneNumber);
        if(isExistPhoneNumber) throw new Error("user with same phone number already exists");

        const newUser = await userRepository.create(userData);
        if(!newUser) throw new Error("Create error");

        const {password, ...userWithoutPassword} = newUser;

        return userWithoutPassword;
    },

    /**
     * @param {string} email
     */

    async getUserByEmail(email) {
        emailSingleSchema.parse(email);
        
        const user = await userRepository.findByEmail(email);
        if(!user) return null;

        const {password, ...userWihoutPassword} = user;

        return userWihoutPassword;
    },

    /**
     * @param {string} phoneNumber 
     */

    async getUserByPhoneNumber(phoneNumber) {
        phoneNumberSingleSchema.parse(phoneNumber);

        const user = await userRepository.findByPhoneNumber(phoneNumber);
        if(!user) return null;

        const {password, ...userWihoutPassword} = user;

        return userWihoutPassword;
    },

    /**
     * @param {string} userId
     */

    async getUserById(userId) {
        const { id } = userIdSchema.parse(userId);

        const user = await userRepository.findById(id);
        if(!user) return null;

        const {password, ...userWithoutPassword} = user;

        return userWithoutPassword;
    },

    async updateUser(rawUserData) {
        const userData = updateUserSchema.parse(rawUserData);

        
    }
}