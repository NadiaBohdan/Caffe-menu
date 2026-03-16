import express from "express";
import { authController } from "./auth.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util";

const router = express.Router();

router.post('/register', asyncCatch(authController.register));

router.post("/login", asyncCatch(authController.login));

export default router;