import { cartService } from "./cart.service.js";

export const cartController = {
    async upsert(req, res) {
        const cartItem = await cartService.upsert({ ...req.body, userId: req.user.id });

        res.status(200).json({
            success: true,
            message: "Successfuly"
        })
    },

    async decrement(req, res) {
        await cartService.decrement({ userId: req.user.id, ...req.body })

        res.status(200).json({
            success: true,
            message: "Successfuly"
        })
    },

    async delete(req, res) {
        await cartService.delete({...req.params, userId: req.user.id });

        res.sendStatus(204);
    }
}