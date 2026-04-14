import express from "express";
import { authController } from "./auth.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody } from "#middlewares/validate.middleware.js";
import { registerDto, loginDto } from "./auth.dto.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";

const router = express.Router();

router.post('/register', validateBody(registerDto), asyncCatch(authController.register));

router.post("/login", validateBody(loginDto), asyncCatch(authController.login));

router.post("/staff/register", validateBody(), asyncCatch(authController.register));

router.post("/staff/login", validateBody(), asyncCatch(authController.login));

router.post("/logout", jwtValidate, asyncCatch(authController.logout));

router.delete("/", jwtValidate, asyncCatch(authController.delete));

export default router;