import express from "express"

import mainSsrRoutes from "#SSR/main/main.routes"

const router = express.Router();

router.use('/', mainSsrRoutes);

export default router;

