import express from "express";
const router = express.Router();

import authRoutes from "#auth/auth.routes";
import tableRoutes from "#table/table.routes";
import categoryRoutes from "#category/category.routes"

router.use('/auth', authRoutes);
router.use('/table', tableRoutes);
router.use('/category', categoryRoutes);

export default router;