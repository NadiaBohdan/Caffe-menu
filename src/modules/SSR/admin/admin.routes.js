import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { adminSSRController } from "./admin.controller.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.use(jwtValidate, checkRole(["admin"]));

router.get('/', asyncCatch(adminSSRController.renderLogin));

router.get('/categories', asyncCatch(adminSSRController.renderCategories));

router.get('/menu', asyncCatch(adminSSRController.renderMenu));

router.get('/footer', asyncCatch(adminSSRController.renderFooter));

export default router;