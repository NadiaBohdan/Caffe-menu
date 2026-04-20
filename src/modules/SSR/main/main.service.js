import { userService } from "#user/user.service.js";
import { productService } from "#product/product.service.js";
import { favouriteService } from "#favourite/favourite.service.js";
import { cartService } from "#cart/cart.service.js";
import { contactService } from "#contact/contact.service.js";

const getOptionalUserData = async (userData) => {
    let user = null;

    if(userData?.id && userData?.role === "user") {
        user = await userService.getById({ id: user.id })
    }

    return user;
}

export const mainSSRService = {
    async main(userData) {
        const user = await getOptionalUserData(userData);
        const contacts = await contactService.getAll();

        return { user, contacts };
    },

    async menu({ userData, category }) {
        const user = await getOptionalUserData(userData);
        const products = await productService.getByCategory(category);

        return { user, products };
    },

    async productView({ userData, productId }) {
        const user = await getOptionalUserData(userData);
        const product = await productService.getById({ id: productId });

        return { user, product };
    },

    async favourites(userData) {
        const user = await userService.getById({ id: userData.id });
        const products = await favouriteService.getAll({ userId: userData.id });

        return { user, products };
    },

    async cart(userData) {
        const user = await userService.getById({ id: userData.id });
        const products = await cartService.getAll({ userId: userData.id });

        return { user, products };
    },

    async contacts(userData) {
        const user = await getOptionalUserData(userData);
        const contacts = await contactService.getAll();

        return { user, contacts };
    },

    async account(userData) {
        const user = await userService.getById({ id: userData.id });

        return { user };
    }
}