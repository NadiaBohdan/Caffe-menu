import express from "express"

import mainSsrRoutes from "#SSR/main/main.routes.js"

const router = express.Router();

router.use('/', mainSsrRoutes);

export default router;

