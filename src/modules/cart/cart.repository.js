import prisma from "#configs/prisma.js";

export const cartRepository = {
    async upsert({cartId, productId, quantity}) {
        return await prisma.cartItems.upsert({
            where: { cartId_productId: { cartId, productId } },
            update: { quantity: { increment: quantity } },
            create: { cartId, productId, quantity }
        })
    },

    async delete({ id, userId}) {
        const result = await prisma.cartItems.deleteMany({
            where: {
                id,
                cart: {  userId }
            }
        })

        return result;
    },

    async getAll(userId) {
        const items = await prisma.cartItems.findMany({
            where: {
                cart: { userId }
            },
            select: {
                id: true,
                quantity: true,
                product: {
                    include: { file: true }
                }
            }
        })

        return items.map(item => ({
            ...item.product,
            quantity: item.quantity,
            cartItemId: item.id
        }));
    },
    
    async getCartId (userId) {
        return await prisma.cart.findUnique({
            where: { userId },
            select: { id: true }
        })
    }
}