import { userService } from "#user/user.service.js";
import { productService } from "#product/product.service.js";
import { favouriteService } from "#favourite/favourite.service.js";
import { cartService } from "#cart/cart.service.js";
import { contactService } from "#contact/contact.service.js";
import { categoryService } from "#category/category.service.js";

const getOptionalUserData = async (id) => {
    let user = null;

    if(id) user = await userService.getNameById({ id });

    return user;
}

export const mainSSRService = {
    async main({ id }) {
        const user = await getOptionalUserData(id);
        const contacts = await contactService.getAll();

        return { user, contacts };
    },

    async getFirstCategory() {
        return categoryService.getFirst();
    },

    async menu({ userId, id }) {
        const user = await getOptionalUserData(userId);
        const categories = await categoryService.getAll();
        const rawProducts = await productService.getByCategory(id);
        const favourites = await favouriteService.getAll({ userId })
        const contacts = await contactService.getAll();
        const activeCategory = id;

        const favoritesId = new Set(favourites.map(fav => fav.id));

        const products = rawProducts.map(product => {
            return {
                ...product,
                isFavorite: favoritesId.has(product.id)
            }
        })

        return { user, products, categories, activeCategory, contacts };
    },

    async productView({ userId, id }) {
        const user = await getOptionalUserData(userId);
        const product = await productService.findById({ id });
        const contacts = await contactService.getAll();

        return { user, product, contacts };
    },

    async favourites({ id }) {
        const user = await userService.getNameById({ id });
        const products = await favouriteService.getAll({ userId: id });
        const contacts = await contactService.getAll();

        return { user, products, contacts };
    },

    async cart({ id }) {
        const user = await userService.getNameById({ id });
        const products = await cartService.getAll({ userId: id });
        const contacts = await contactService.getAll();

        return { user, products, contacts };
    },

    async contacts({ id }) {
        const user = await getOptionalUserData(id);
        const contacts = await contactService.getAll();

        return { user, contacts };
    },

    async account({ id }) {
        const user = await userService.getById({ id });
        const contacts = await contactService.getAll();

        return { user, contacts };
    },

    async user({ id }) {
        const user = await getOptionalUserData(id);
        const contacts = await contactService.getAll();

        return { user, contacts };
    }
}