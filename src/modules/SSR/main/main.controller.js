import { mainSSRService } from "./main.service.js";

const DIR = "main/";

const VIEWS = {
    HOME: "home",
    MENU: "menu",
    VIEW_PRODUCT: "view-menu",
    LOGIN: "login",
    REGISTER: "sign-up",
    ACCOUNT: "account",
    CONTACT: "contact",
    FAVOURITES: "favourites",
    CART: "cart",
    EMPTY: "empty"
};

const renderMain = (res, view, data = {}) => {
    res.render(`${DIR}/${view}`, data);
};

const uid = (req) => ({ id: req.user?.id ?? null });

export const mainSSRController = {
    async renderMainpage(req, res) {
        const { user, contacts } = await mainSSRService.main(uid(req));
        renderMain(res, VIEWS.HOME, { link: VIEWS.HOME, contacts, user });
    },

    async renderMenuEmpty(req, res) {
        const { user, contacts } = await mainSSRService.user(uid(req));
        renderMain(res, `${VIEWS.MENU}/${VIEWS.EMPTY}`, { link: `${VIEWS.MENU}-${VIEWS.EMPTY}`, user, contacts });
    },

    async renderMenu(req, res) {
        const { user, products, categories, activeCategory, contacts } = await mainSSRService.menu({
            userId: req.user?.id ?? null,
            id: req.params.id
        });
        renderMain(res, VIEWS.MENU, { link: VIEWS.MENU, activeCategory, categories, products, user, contacts });
    },

    async renderViewProductEmpty(req, res) {
        const { user, contacts } = await mainSSRService.user(uid(req));
        renderMain(res, `${VIEWS.VIEW_PRODUCT}/${VIEWS.EMPTY}`, { link: `${VIEWS.VIEW_PRODUCT}-${VIEWS.EMPTY}`, user, contacts });
    },

    async renderViewProduct(req, res) {
        const { user, product, contacts, isFavourite } = await mainSSRService.productView({
            userId: req.user?.id ?? null,
            id: req.params.id
        });
        if(!product) return res.redirect(`/${VIEWS.VIEW_PRODUCT}/${VIEWS.EMPTY}`);
        renderMain(res, VIEWS.VIEW_PRODUCT, { link: VIEWS.VIEW_PRODUCT, product, user, isFavourite, contacts });
    },

    async renderContact(req, res) {
        const { user, contacts } = await mainSSRService.contacts(uid(req));
        renderMain(res, VIEWS.CONTACT, { link: VIEWS.CONTACT, contacts, user });
    },

    async renderLogin(req, res) {
        const { user, contacts } = await mainSSRService.user(uid(req));
        renderMain(res, VIEWS.LOGIN, { link: VIEWS.LOGIN, user, contacts });
    },

    async renderRegister(req, res) {
        const { user, contacts } = await mainSSRService.user(uid(req));
        renderMain(res, VIEWS.REGISTER, { link: VIEWS.REGISTER, user, contacts });
    },

    async renderFavourites(req, res) {
        const { user, products, contacts } = await mainSSRService.favourites(req.user);
        renderMain(res, VIEWS.FAVOURITES, { link: VIEWS.FAVOURITES, user, products, contacts });
    },

    async renderCart(req, res) {
        const { user, products, contacts } = await mainSSRService.cart(req.user);
        renderMain(res, VIEWS.CART, { link: VIEWS.CART, user, products, contacts });
    },

    async renderAccount(req, res) {
        const { user, contacts } = await mainSSRService.account(req.user);
        renderMain(res, VIEWS.ACCOUNT, { link: VIEWS.ACCOUNT, user, contacts });
    },

    async renderMenuRedirect(req, res) {
        const category = await mainSSRService.getFirstCategory();
        if(!category) return res.redirect(`/${VIEWS.MENU}/${VIEWS.EMPTY}`);
        res.redirect(`/${VIEWS.MENU}/${category.id}`);
    },
};