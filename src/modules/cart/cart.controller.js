import { cartService } from "./cart.servise.js";

export const cartController = {
    async upsert(req, res) {
        const cartItem = await cartService.upsert(req.body);

        res.status(200).json({
            success: true,
            item: cartItem
        })
    },

    async delete(req, res) {
        await cartService.delete({ ...req.body, ...req.params });

        res.sendStatus(204);
    }
}