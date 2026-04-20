import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { adminSSRController } from "./admin.controller.js";
import { validateParams } from "#middlewares/validate.middleware.js";
import { idDto } from "#dto/global.dto.js";

const router = express.Router();

router.get('/', asyncCatch());

router.get('/categoies', asyncCatch());

router.get('/menu', asyncCatch());

router.get('footer', asyncCatch());

export default router;