import { userService } from "#user/user.service.js";
import { staffService } from "#staff/staff.service.js";
import { generateToken } from "#utils/jwt.util.js";
import { ApiError } from "#utils/error.util.js";
import { comparePassword } from "#utils/hash.util.js";

export const authService = {
    async register(data) {
        const user = await userService.createUser(data);

        const token = await generateToken({ id: user.id });

        return token;
    },

    async login(data) {
        const user = await userService.getUserByIdentifier(data.identifier);
        if(!user) throw new ApiError(400, "Wrong login or password");

        const isSamePassword = await comparePassword(data.password, user.password);
        if(!isSamePassword) throw new ApiError(400, "Wrong login or password");

        const token = await generateToken({ id: user.id });

        return token;
    },

    async delete({ id, role }) {
        const service = role === "user" ? userService : staffService;

        if(!service) throw new Error(`Service for role ${role} not found`);

        return await service.delete(id);
    }
}