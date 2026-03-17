import { authService } from "./auth.service.js"

export const authController = {
    async register(req, res) {
        const { registerData } = req.body;

        const token = await authService.registerUser(registerData);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24
        })

        res.status(201).json({ success: true });
    },

    async login(req, res) {
        const { loginData } = req.body;

        const token = await authService.loginUser(loginData);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24
        })

        res.status(200).json({ success: true });
    }
}