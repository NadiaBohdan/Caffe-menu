import express from "express";
import { authController } from "./auth.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util";
import { validate } from "#middlwares/validate.middlware";
import { registerDto, loginDto } from "./auth.dto.js";

const router = express.Router();

router.post('/register', validate(registerDto), asyncCatch(authController.register));

router.post("/login", validate(loginDto), asyncCatch(authController.login));

export default router;