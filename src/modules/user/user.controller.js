import { userService } from "./user.service.js";

export const userController = {
    async update(req, res) {
        const user = await userService.update({ ...req.body, ...req.params });
        return res.status(200).json({
            success: true,
            message: "Updated uccessufully",
            user
        });
    },
}