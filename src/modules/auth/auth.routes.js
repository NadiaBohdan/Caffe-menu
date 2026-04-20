import express from "express";
import { authController } from "./auth.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody } from "#middlewares/validate.middleware.js";
import { registerDto, loginUserDto, loginStaffDto } from "./auth.dto.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";

const router = express.Router();

router.post('/register', validateBody(registerDto), asyncCatch(authController.register));

router.post("/login", validateBody(loginUserDto), asyncCatch(authController.loginUser));

router.post("/staff/login", validateBody(loginStaffDto), asyncCatch(authController.loginStaff));

router.post("/logout", jwtValidate, asyncCatch(authController.logout));

router.delete("/", jwtValidate, asyncCatch(authController.delete));

export default router;