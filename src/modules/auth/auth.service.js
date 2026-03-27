import { userService } from "#user/user.service";
import { generateToken } from "#utils/jwt.util";
import { ApiError } from "#utils/error.util";
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

    async registerUser({password, ...userData}) {
        const isEmailExists = await userService.findUserByIdentifier(userData.email);
        if(isEmailExists) throw new ApiError(409, "User with same email already exists");

        const isPhoneNumberExists = await userService.findUserByIdentifier(userData.phoneNumber);
        if(isPhoneNumberExists) throw new ApiError(409, "User with same phone number already exists");

        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userService.createUser({ password: hashedPassword, ...userData});
        if(!user) throw new ApiError(500, "Create user error");

        const token = await generateToken({ id: user.id });

        return token
    },

    /**
     * @param {Object} userData 
     * @param {string} userData.identifier
     * @param {string} userData.password
     */

    async loginUser(userData) {
        const user = await userService.getUserByIdentifier(userData.identifier);
        if(!user) throw new ApiError(400, "Wrong login or password");

        const isSamePassword = await bcrypt.compare(userData.password, user.password);
        if(!isSamePassword) throw new ApiError(400, "Wrong login or password");

        const token = await generateToken({ id: user.id });

        return token;
    }
}