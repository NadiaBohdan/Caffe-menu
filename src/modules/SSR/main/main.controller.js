export const mainSSRController = {
    async renderMainpage(req, res) {
        const linkName = 'home';

        res.render(linkName, {
            link: linkName
        })
    },

    async renderMenu(req, res) {
        const linkName = 'menu';

        res.render(linkName, {
            link: linkName
        })
    },

    async renderViewProduct(req, res) {
        const linkName = 'view-menu';

        res.render(linkName, {
            title: "Cesar",
            description: "Класичний салат Цезар з куркою гриль, свіжим листям салату та фірмовим соусом.",
            price: 190,
            mass: 200,
            link: linkName
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
        
        res.render(linkName, {
            link: `${linkName}.njk`
        })
    },

    async renderContact(req, res) {
        const linkName = 'contact';

        res.render(linkName, {
            link: linkName
        })
    }
}