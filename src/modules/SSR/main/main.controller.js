import { mainSSRService } from "./main.service.js";
import { productService } from "./product.service.js";

const DIR = "main";

const VIEWS = {
    HOME: "home",
    MENU: "menu",
    VIEW_PRODUCT: "view-menu",
    LOGIN: "login",
    REGISTER: "sign-up",
    ACCOUNT: "account",
    CONTACT: "contact",
    FAVOURITES: "favourites",
    CART: "cart"
};

const renderMain = (res, view, data = {}) => {
    return res.render(`${DIR}/${view}`, data);
};

export const mainSSRController = {
    async renderMainpage(req, res) {
        const { user, contacts } = await mainSSRService.main(req.user);

        renderMain(res, VIEWS.HOME, {
            link: VIEWS.HOME,
            contacts,
            user
        });
    },

    async renderMenu(req, res) {
        const { user, products } = await mainSSRService.menu({
            userData: req.user,
            category: req.query.category
        });

        renderMain(res, VIEWS.MENU, {
            link: VIEWS.MENU,
            products,
            user
        });
    },

    async renderViewProduct(req, res) {
        const { user, product } = await mainSSRService.productView({
            userData: req.user,
            productId: req.params.id
        });

        renderMain(res, VIEWS.VIEW_PRODUCT, {
            link: VIEWS.VIEW_PRODUCT,
            product,
            user
        });
    },

    async renderLogin(req, res) {
        const { user } = await mainSSRService.auth(req.user);

        renderMain(res, VIEWS.LOGIN, {
            link: VIEWS.LOGIN,
            user
        });
    },

    async renderRegister(req, res) {
        const { user } = await mainSSRService.auth(req.user);

        renderMain(res, VIEWS.REGISTER, {
            link: VIEWS.REGISTER,
            user
        });
    },

    async renderAccount(req, res) {
        const { user } = await mainSSRService.account(req.user);

        renderMain(res, VIEWS.ACCOUNT, {
            link: VIEWS.ACCOUNT,
            user
        });
    },

    async renderContact(req, res) {
        const { user, contacts } = await mainSSRService.contacts(req.user);

        renderMain(res, VIEWS.CONTACT, {
            link: VIEWS.CONTACT,
            contacts,
            user
        });
    },

    async renderFavourites(req, res) {
        const { user, products } = await mainSSRService.favourites(req.user);

        renderMain(res, VIEWS.FAVOURITES, {
            link: VIEWS.FAVOURITES,
            user,
            products
        });
    },

    async renderCart(req, res) {
        const { user, products } = await mainSSRService.cart(req.user);

        renderMain(res, VIEWS.CART, {
            link: VIEWS.CART,
            user,
            products
        });
    }
};