import express from "express";
import { authController } from "./auth.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody } from "#middlewares/validate.middleware.js";
import { registerDto, loginDto } from "./auth.dto.js";

const router = express.Router();

router.post('/register', validateBody(registerDto), asyncCatch(authController.register));

router.post("/login", validateBody(loginDto), asyncCatch(authController.login));

export default router;