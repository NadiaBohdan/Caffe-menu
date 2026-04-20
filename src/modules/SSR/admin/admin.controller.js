import { adminSSRservice } from "./admin.service.js";

const DIR = 'admin';

const VIEWS = {
    LOGIN: 'login',
    CATEGORIES: 'categories',
    PRODUCTS: 'products',
    FOOTER: 'footer'
};

const renderAdmin = (res, view, data = {}) => {
    return res.render(`${DIR}/${view}`, data);
};

export const adminSSRController = {
    async renderLogin(req, res) {
        renderAdmin(res, VIEWS.LOGIN, {
            link: VIEWS.LOGIN
        });
    },

    async renderCategories(req, res) {
        const data = await adminSSRservice.getCategories(req.user.id);

        renderAdmin(res, VIEWS.CATEGORIES, {
            link: VIEWS.CATEGORIES,
            categories: data.categories,
            staff: data.staff
        });
    },

    async renderMenu(req, res) {
        const data = await adminSSRservice.getProducts(req.user.id);

        renderAdmin(res, VIEWS.PRODUCTS, {
            link: VIEWS.PRODUCTS,
            products: data.products,
            staff: data.staff
        });
    },

    async renderFooter(req, res) {
        const data = await adminSSRservice.getContacts(req.user.id)

        renderAdmin(res, VIEWS.FOOTER, {
            link: VIEWS.FOOTER,
            contacts: data.contacts,
            staff: data.staff
        });
    }
};