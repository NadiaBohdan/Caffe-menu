import express from "express";

const router = express.Router();

import authRoutes from "#auth/auth.routes.js";
import userRoutes from "#user/user.routes.js"
import categoryRoutes from "#category/category.routes.js";
import tableRoutes from "#table/table.routes.js";
import productRoutes from "#product/product.routes.js";
import favouriteRoutes from "#favourite/favourite.routes.js";
import cartRoutes from "#cart/cart.routes.js";
import contactRoutes from "#contact/contact.routes.js";
import staffRoutes from "#staff/staff.routes.js";

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/table', tableRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/favourite', favouriteRoutes);
router.use('/cart', cartRoutes);
router.use('/contact', contactRoutes);
router.use('/staff', staffRoutes)

export default router;