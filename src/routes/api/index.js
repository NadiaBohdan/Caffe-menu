import express from "express";
const router = express.Router();

import authRoutes from "#auth/auth.routes.js";
import categoryRoutes from "#category/category.routes.js";
import tableRoutes from "#table/table.routes.js";
import productRoutes from "#product/product.routes.js";
import favouriteRoutes from "#favourite/favourite.routes.js"

router.use('/auth', authRoutes);
router.use('/table', tableRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/favourite', favouriteRoutes);

export default router;