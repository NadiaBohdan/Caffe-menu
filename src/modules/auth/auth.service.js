import { userService } from "#user/user.service";
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

export const authService = {
    /**
     * @param {Object} userData 
     * @param {string} userData.firstName
     * @param {string} userData.lastName
     * @param {string} userData.password
     * @param {string} userData.phoneNumber
     * @param {string} userData.email
     */

    async registerUser(userData) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        userData.password = await bcrypt.hash(userData.password, salt);

        await userService.createUser(userData);
    }
}