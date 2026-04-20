import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { adminSSRController } from "./admin.controller.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.get('/', jwtValidate, checkRole(["admin"]), asyncCatch(adminSSRController.renderLogin));

router.get('/categories', jwtValidate, checkRole(["admin"]), asyncCatch(adminSSRController.renderCategories));

router.get('/menu', jwtValidate, checkRole(["admin"]), asyncCatch(adminSSRController.renderMenu));

router.get('/footer', jwtValidate, checkRole(["admin"]), asyncCatch(adminSSRController.renderFooter));

export default router;