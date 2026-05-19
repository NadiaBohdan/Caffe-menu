import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { adminSSRController } from "./admin.controller.js";
import { validateParams } from "#middlewares/validate.middleware.js";
import { idDto } from "#dto/global.dto.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.get('/', asyncCatch(adminSSRController.renderLogin));

router.use(jwtValidate, checkRole(["admin"]));

router.get('/categories', asyncCatch(adminSSRController.renderCategories));

router.get('/menu', asyncCatch(adminSSRController.redirectMenu));

router.get('/menu/empty', asyncCatch(adminSSRController.renderMenuEmpty));

router.get('/menu/:id', validateParams(idDto), asyncCatch(adminSSRController.renderMenu));

router.get('/footer', asyncCatch(adminSSRController.renderFooter));

export default router;