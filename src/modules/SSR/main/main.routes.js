import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { mainSSRController } from "./main.controller.js";

const router = express.Router();

router.get('/', asyncCatch(mainSSRController.renderMainpage));

router.get('/menu', asyncCatch());

router.get('/menu/:id', asyncCatch());

router.get('favourite', asyncCatch());

router.get('/cart', asyncCatch());

router.get('/contact', asyncCatch());

router.get('/orders', asyncCatch());

router.get('/orders/:id', asyncCatch());

router.get('/checkout-order', asyncCatch());

router.get('/login', asyncCatch());

router.get('/login', asyncCatch());

router.get('/register', asyncCatch());

router.get('/account', asyncCatch());

export default router;