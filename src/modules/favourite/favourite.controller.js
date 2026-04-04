import { favouriteService } from "./favourite.service.js";

export const favouriteController = {
    async toggle(req, res) {
        await favouriteService.toggle(req.body);

        return res.status(200).json({
            message: "Product was added to favourites",
            success: true
        })
    }
}