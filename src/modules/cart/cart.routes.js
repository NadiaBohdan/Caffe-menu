import express from "express"
import { cartController } from "./cart.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { upsertCartDto, cartIdDto } from "./cart.dto.js";

const router = express.Router();

router.post('/', jwtValidate, validateBody(upsertCartDto), asyncCatch(cartController.upsert));

router.delete('/:id', jwtValidate, validateParams(cartIdDto), asyncCatch(cartController.delete))

export default router