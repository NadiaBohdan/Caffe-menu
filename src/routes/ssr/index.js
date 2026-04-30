import express from "express"

import mainSsrRoutes from "#SSR/main/main.routes.js"
import adminSsrRoutes from "#SSR/admin/admin.routes.js"

const router = express.Router();

router.use('/', mainSsrRoutes);
router.use('/admin', adminSsrRoutes);

export default router;

