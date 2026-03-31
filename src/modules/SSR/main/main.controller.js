export const mainSSRController = {
    async renderMainpage(req, res) {
        res.render("home")
    },

    async renderMenu(req, res) {
        res.render("menu")
    },

    async renderViewProduct(req, res) {
        res.redner("view-menu", {
            title: "Cesar",
            description: "lorem ya ne pomnu yak robiti avtomatichnu generaciu textu dlia opisu tak sho bude otaka ot baida i! sadasd asdas dasdas dasdadwa dasdadwad asdawda sdawda dasdawdawfaf asfafwafasfas fafw asd asda sdasd asdas ddasaasdasdasdasdasdasdasdasda sda sd asdasdwadasd asdwa",
            price: 190,
            mass: 200
        })
    },

    async renderLogin(req, res) {
        res.render("login")
    },

    async renderRegister(req, res) {
        res.render('register')
    }
}