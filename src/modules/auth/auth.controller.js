export const authController = {
    async register(req, res, next) {
        try {
            const  { registerData } = req.body;

            //service

            res.sendStatus(201);
        } catch(err) {
            next(err);
        }
    },

    async login(req, res, next) {
        const { loginData } = req.body;

        //service

        res.sendStatus(200);
    }
}