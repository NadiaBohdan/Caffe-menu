import express from "express"
import { userController } from "./user.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { updateUserDto } from "./user.dto.js";
import { idDto } from "#dto/global.dto.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.put('/:id', jwtValidate, checkRole(["user"]), validateParams(idDto), validateBody(updateUserDto), asyncCatch(userController.update));