import express from "express";
const router = express.Router();

import authRoutes from "#auth/auth.routes";
import tableRoutes from "#table/table.routes"

router.use('/auth', authRoutes);
router.use('/table', tableRoutes);

export default router;