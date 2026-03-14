import { authService} from "./auth.service.js"

export const authController = {
    async register(req, res, next) {
        try {
            const { registerData } = req.body;

            const token = await authService.registerUser(registerData);

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24
            })

            res.sendStatus(201);
        } catch(err) {
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const { loginData } = req.body;

            const token = await authService.loginUser(loginData);

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24
            })

            res.sendStatus(200);
        } catch(err) {
            next(err);
        }
        
    }
}