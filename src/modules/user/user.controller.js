import { userService } from "./user.service.js";

export const userController = {
    async update(req, res) {
        console.log("DATA::::: ", { ...req.body, ...req.user })
        const user = await userService.update({ ...req.body, ...req.user });
        return res.status(200).json({
            success: true,
            message: "Updated uccessufully",
            user
        });
    },
}