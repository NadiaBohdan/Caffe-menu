import { favouriteService } from "./favourite.service.js";

export const favouriteController = {
    async toggle(req, res) {
        await favouriteService.toggle({ ...req.body, userId: req.user.id });

        return res.status(200).json({
            success: true
        })
    }
}