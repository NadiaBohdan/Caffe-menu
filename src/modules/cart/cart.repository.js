import prisma from "#configs/prisma.js";

export const cartRepository = {
    async create({cartId, productId, quantity}) {
        return await prisma.cartItems.upsert({
            where: { cartId_productId: { cartId, productId } },
            update: { quantity: { increment: quantity } },
            create: { cartId, productId, quantity }
        })
    },

    async update({cartId, productId, quantity}) {
        return await prisma.cartItems.update({
            data: { quantity },
            where: {
                cartId_productId: { cartId, productId }
            }
        })
    },

    async delete(id) {
        return await prisma.cartItems.delete({
            where: { id }
        })
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