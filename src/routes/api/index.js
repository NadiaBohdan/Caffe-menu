import express from "express";
const router = express.Router();

import authRoutes from "#auth/auth.routes.js";

router.use('/auth', authRoutes);

export default router;