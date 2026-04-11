import { userRepository } from "./user.repository.js"
import { ApiError } from "#utils/error.util.js"; 

const sanitize = (userData) => {
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
}

export const userService = {

    async create(data) {
        const isExistEmail = await userRepository.findByIdentifier(data.email)
        if(isExistEmail) throw new ApiError(409, "User with same email already exists");

        const isExistPhoneNumber = await userRepository.findByField(data.phoneNumber);
        if(isExistPhoneNumber) throw new ApiError(409, "user with same phone number already exists");

        const newUser = await userRepository.create(userData);

        return sanitize(newUser);
    },

    async getByIdentifier({ identifier }) {
        const user = await userRepository.findByIdentifier(identifier);
        return user;
    },

    async getById(id) {
        const user = await userRepository.findById(id);
        if(!user) return null;

        return sanitize(user);
    },

    async update({ ...data, userId}) {
        if(data.phoneNumber || data.email) {
            const isExistingUserByEmail = await userRepository.findByIdentifier(data.email);
            if(isExistingUserByEmail && isExistingUserByEmail.id !== userId) throw new ApiError(409, "This email is already taken");

            const isExistingUserByPhoneNumber = await userRepository.findByIdentifier(data.phoneNumber);
            if(isExistingUserByPhoneNumber && isExistingUserByPhoneNumber.id !== userId) throw new ApiError(409, "This phone number is already taken");
        }
        
        const updatedUser = await userRepository.update({ ...data, id });
        if(!updatedUser) throw new ApiError(404, "User not found");

        return sanitize(updatedUser);
    },

    async delete({ id }) {
        const deletedUser = await userRepository.delete(id);
        return sanitize(deletedUser);
    }
}