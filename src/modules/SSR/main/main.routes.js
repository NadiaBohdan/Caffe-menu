import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { mainSSRController } from "./main.controller.js";
import { validateParams } from "#middlewares/validate.middleware.js";
import { idDto } from "#dto/global.dto.js";
import { jwtOptional, jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.get('/', jwtOptional, asyncCatch(mainSSRController.renderMainpage));

router.get('/menu', asyncCatch(mainSSRController.renderMenuRedirect));

router.get('/menu/empty', jwtOptional, asyncCatch(mainSSRController.renderMenuEmpty));

router.get('/menu/:id', jwtOptional, asyncCatch(mainSSRController.renderMenu));

router.get('/view-menu/:id', jwtOptional, validateParams(idDto), asyncCatch(mainSSRController.renderViewProduct));

router.get('/favourites', jwtValidate, checkRole(["user"]), asyncCatch(mainSSRController.renderFavourites));

router.get('/cart', jwtValidate, checkRole(["user"]), asyncCatch(mainSSRController.renderCart));

router.get('/contact', jwtOptional, asyncCatch(mainSSRController.renderContact));

router.get('/orders', asyncCatch());

router.get('/orders/:id', validateParams(idDto), asyncCatch());

router.get('/checkout-order', asyncCatch());

router.get('/login', jwtOptional, asyncCatch(mainSSRController.renderLogin));

router.get('/sign-up', jwtOptional, asyncCatch(mainSSRController.renderRegister));

router.get('/account', jwtValidate, checkRole(["user"]), asyncCatch(mainSSRController.renderAccount));

export default router;