import { adminSSRservice } from "./admin.service.js";

const DIR = 'admin';

const VIEWS = {
    LOGIN: 'login',
    CATEGORIES: 'categories',
    MENU: 'menu',
    FOOTER: 'footer',
    EMPTY: 'empty'
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
        const { categories, staff } = await adminSSRservice.categories(req.user.id);

        renderAdmin(res, VIEWS.CATEGORIES, {
            link: VIEWS.CATEGORIES,
            categories,
            staff
        });
    },

    async redirectMenu(req, res) {
        const category = await adminSSRservice.getFirstCategory();

        if(!category) return res.redirect(`${VIEWS.EMPTY}`);

        res.redirect(`${category.id}`);
    },

    async renderMenuEmpty(req, res) {
        renderAdmin(res, `${VIEWS.MENU}/${VIEWS.EMPTY}`, {
            link: `${VIEWS.MENU}/${VIEWS.EMPTY}`
        })
    },

    async renderMenu(req, res) {
        const { products, categories, staff } = await adminSSRservice.menu({ id: req.user.id, categoryId: req.params.id });

        renderAdmin(res, VIEWS.MENU, {
            link: VIEWS.MENU,
            categories,
            products,
            staff
        });
    },

    async renderFooter(req, res) {
        const { staff, contacts } = await adminSSRservice.contacts(req.user.id)

        renderAdmin(res, VIEWS.FOOTER, {
            link: VIEWS.FOOTER,
            contacts,
            staff
        });
    }
};