import { authService } from "./auth.service.js"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24
}

const TOKEN_NAME = 'accessToken';

export const authController = {
    async register(req, res) {
        const token = await authService.register(req.body);

        res.cookie(TOKEN_NAME, token, COOKIE_OPTIONS)

        res.status(201).json({ success: true, redirect: '/' })
    },

    async loginUser(req, res) {
        const token = await authService.loginUser(req.body);

        res.cookie(TOKEN_NAME, token, COOKIE_OPTIONS)

        res.status(200).json({ success: true, redirect: '/' });
    },

    async loginStaff(req, res) {
        const token = await authService.loginStaff(req.body);

        res.cookie(TOKEN_NAME, token, COOKIE_OPTIONS);

        res.status(200).json({ success: true, redirect: '/admin/' })
    },

    async logout(req, res) {
        res.clearCookie(TOKEN_NAME);

        res.status(200).json({ success: true, redirect: '/' });
    },

    async delete(req, res) {
        await authService.delete(req.user);

        res.clearCookie(TOKEN_NAME);

        res.status(200).json({ success: true, redirect: '/' });
    }
}