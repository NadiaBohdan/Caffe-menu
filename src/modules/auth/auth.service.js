import { userService } from "#user/user.service.js";
import { staffService } from "#staff/staff.service.js";
import { generateToken } from "#utils/jwt.util.js";
import { ApiError } from "#utils/error.util.js";
import { verifyLoginData } from "#utils/auth.util.js";

export const authService = {
    async register(data) {
        const user = await userService.create(data);

        const token = await generateToken({ id: user.id });

        return token;
    },

    async loginUser(data) {
        const user = await userService.getByIdentifier({ identifier: data.identifier });

        await verifyLoginData(user, data.password);

        const token = await generateToken({ id: user.id, role: user.role });
        return token;
    },

    async loginStaff(data) {
        const staff = await staffService.getByIdentifier({ login: data.login });
        console.log("DATA::::::: ", data);
        await verifyLoginData(staff, data.password);

        const token = await generateToken({ id: staff.id, role: staff.role });
        return token;
    },

    async delete({ id, role }) {
        const service = role === "user" ? userService : staffService;

        if(!service) throw new Error(`Service for role ${role} not found`);

        return await service.delete(id);
    }
}