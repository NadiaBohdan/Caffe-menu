import { contactService } from "#contact/contact.service.js";
import { productService } from "#product/product.service.js";
import { userService } from "#user/user.service.js";
import { favouriteService } from "#favourite/favourite.service.js";

export const mainSSRController = {
    async renderMainpage(req, res) {
        const linkName = 'home';

        const contacts = await contactService.getAll();
        console.log("DATA:::::::: ", contacts)

        res.render(linkName, {
            link: linkName,
            contacts
        })
    },

    async renderMenu(req, res) {
        const linkName = 'menu';

        const products = await productService.getByCategory();
        console.log("DATA:::::::: ", products)

        res.render(linkName, {
            link: linkName,
            products
        })
    },

    async renderViewProduct(req, res) {
        const linkName = 'view-menu';

        const product = await productService.getById(req.params)
        console.log("DATA:::::::: ", product)

        res.render(linkName, {
            link: linkName,
            product
        })
    },

    async renderLogin(req, res) {
        const linkName = 'login';
        
        res.render(linkName, {
            link: linkName
        })
    },

    async renderRegister(req, res) {
        const linkName = 'sign-up';

        res.render(linkName, {
            link: linkName
        })
    },

    async renderAccount(req, res) {
        const linkName = 'account';

        const user = await userService.getById({ id: req.user.id });
        console.log("DATA:::::::: ", user)
        
        res.render(linkName, {
            link: linkName,
            user
        })
    },

    async renderContact(req, res) {
        const linkName = 'contact';

        const contacts = await contactService.getAll();
        console.log("DATA:::::::: ", contacts)

        res.render(linkName, {
            link: linkName,
            contacts
        })
    },

    async renderFavourites(req, res) {
        const linkName = 'favourites';
    }
}