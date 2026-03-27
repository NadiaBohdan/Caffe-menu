import { authService } from "./auth.service.js"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24
}

export const authController = {
    async register(req, res) {
        const token = await authService.registerUser(req.body);

        res.cookie('accessToken', token, COOKIE_OPTIONS)

        res.status(201).json({ success: true });
    },

    async login(req, res) {
        const token = await authService.loginUser(req.body);

        res.cookie('accessToken', token, COOKIE_OPTIONS)

        res.status(200).json({ success: true });
    }
}