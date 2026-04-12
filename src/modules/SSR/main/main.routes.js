import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { mainSSRController } from "./main.controller.js";
import { validateParams } from "#middlewares/validate.middleware.js";
import { idDto } from "#dto/global.dto.js";

const router = express.Router();

router.get('/', asyncCatch(mainSSRController.renderMainpage));

router.get('/menu', asyncCatch(mainSSRController.renderMenu));

router.get('/menu/:id', validateParams(idDto), asyncCatch(mainSSRController.renderViewProduct));

router.get('favourite', asyncCatch());

router.get('/cart', asyncCatch());

router.get('/contact', asyncCatch(mainSSRController.renderContact));

router.get('/orders', asyncCatch());

router.get('/orders/:id', validateParams(idDto), asyncCatch());

router.get('/checkout-order', asyncCatch());

router.get('/login', asyncCatch(mainSSRController.renderLogin));

router.get('/sign-up', asyncCatch(mainSSRController.renderRegister));

router.get('/account', asyncCatch(mainSSRController.renderAccount));

export default router;