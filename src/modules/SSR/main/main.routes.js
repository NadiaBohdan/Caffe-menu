import express from "express"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { mainSSRController } from "./main.controller.js";

const router = express.Router();

router.get('/', asyncCatch(mainSSRController.renderMainpage));

export default router;