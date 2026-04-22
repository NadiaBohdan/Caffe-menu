import { userRepository } from "./user.repository.js"
import { ApiError } from "#utils/error.util.js"; 
import { hashPassword } from "#utils/hash.util.js";

const sanitize = (userData) => {
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
}

export const userService = {

    async create(data) {
        const isExistEmail = await userRepository.findByIdentifier(data.email)
        if(isExistEmail) throw new ApiError(409, "User with same email already exists");

        const isExistPhoneNumber = await userRepository.findByIdentifier(data.phoneNumber);
        if(isExistPhoneNumber) throw new ApiError(409, "user with same phone number already exists");

        data.password = await hashPassword(data.password);

        const newUser = await userRepository.create(data);

        return sanitize(newUser);
    },

    async getByIdentifier({ identifier }) {
        const user = await userRepository.findByIdentifier(identifier);
        return user;
    },

    async getById({ id }) {
        const user = await userRepository.findById(id);
        if(!user) return null;

        return sanitize(user);
    },

    async getNameById({ id }) {
        const user = await userRepository.getNameById(id);
        if(!user) return null;

        return user;
    },

    async update({ id, password, ...data}) {
        if(data.email) {
            const isExistingUserByEmail = await userRepository.findByIdentifier(data.email);
            if(isExistingUserByEmail && isExistingUserByEmail.id !== id) throw new ApiError(409, "This email is already taken");
        }

        if(data.phoneNumber) {
            const isExistingUserByPhoneNumber = await userRepository.findByIdentifier(data.phoneNumber);
            if(isExistingUserByPhoneNumber && isExistingUserByPhoneNumber.id !== id) throw new ApiError(409, "This phone number is already taken");
        }

        if(!isExistingUserByEmail && !isExistingUserByPhoneNumber) {
            throw new ApiError(404, "User not found");
        }

        if(password) password = await hashPassword(password);
        
        const updatedUser = await userRepository.update({ id, password, ...data });

        return sanitize(updatedUser);
    },

    async delete({ id }) {
        const deletedUser = await userRepository.delete(id);
        return sanitize(deletedUser);
    }
}