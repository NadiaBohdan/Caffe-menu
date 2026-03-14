import { userService } from "#user/user.service";
import { registerDto, loginDto } from "./auth.dto.js";
import { generateToken } from "#utils/jwt.util";
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
        const parsedData = registerDto.parse(userData);

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        parsedData.password = await bcrypt.hash(parsedData.password, salt);

        const user = await userService.createUser(parsedData);
        if(!user) throw new Error("Create user error");

        const token = await generateToken({ id: user.id, role: user.role });

        return token
    },

    /**
     * @param {Object} userData 
     * @param {string} userData.identifier
     * @param {string} userData.password
     */

    async loginUser(userData) {
        const parsedData = loginDto.parse(userData);

        const user = await userService.getUserByIdentifier(parsedData.identifier);
        if(!user) throw new Error("Wrong login or password");

        const isSamePassword = await bcrypt.compare(parsedData.password, user.password);
        if(!isSamePassword) throw new Error("Wrong login or password");

        const token = await generateToken({ id: user.id, role: user.role });

        return token;
    }
}