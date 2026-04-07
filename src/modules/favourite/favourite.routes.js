import express from "express"
import { favouriteController } from "./favourite.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody } from "#middlewares/validate.middleware.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { toggleDto } from "./favourite.dto.js";

const router = express.Router();

router.post('/toggle', jwtValidate, validateBody(toggleDto), asyncCatch(favouriteController.toggle));

export default router