import { cartRepository } from "./cart.repository.js";
import { productService } from "#product/product.service.js";
import { ApiError } from "#utils/error.util.js";

const checkCart = async (userId) => {
    const response = await cartRepository.getCartId(userId);
    if(!response?.id) throw new ApiError(404, "Cart do not found");

    return response.id;
}

export const cartService = {
    async upsert({ productId, userId, quantity }) {
        const cartId = await checkCart(userId);

        await productService.findById({ id: productId });

        const cartItem = await cartRepository.upsert({ cartId, productId, quantity });
        return cartItem;
    },

    async delete({ id, userId }) {
        const result = await cartRepository.delete({ id, userId });

        if(result.count === 0) throw new ApiError(404, "Item not found or access denied");
    },

    async decrement({ userId, productId }) {
        const cartId = await checkCart(userId);

        const existing = await cartRepository.getByProductId({ cartId, productId });

        if(!existing) throw new ApiError(400, "Product do not exists");
        if(existing.quantity === 0) throw new ApiError(400, "Can't reduce lowwer than 0");

        const cartItem = await cartRepository.decrement({ cartId, productId });
        return cartItem;
    },
    
    async getAll({ userId }) {
        const cartList = await cartRepository.getAll(userId);
        return cartList;
    }   
}