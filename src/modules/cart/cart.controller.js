import { cartService } from "./cart.servise.js";

export const cartController = {
    async upsert(req, res) {
        console.log("aaaaaaaaaaaaa   ", { ...req.body, userId: req.user.id })
        const cartItem = await cartService.upsert({ ...req.body, userId: req.user.id });

        res.status(200).json({
            success: true,
            item: cartItem
        })
    },

    async delete(req, res) {
        await cartService.delete({...req.params, userId: req.user });

        res.sendStatus(204);
    }
}