import express from "express";
const router = express.Router();

import authRoutes from "#auth/auth.routes.js";
import tableRoutes from "#table/table.routes.js"

router.use('/auth', authRoutes);
router.use('/table', tableRoutes);

export default router;