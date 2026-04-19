import express from "express"
import { contactController } from "./contact.controller.js"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { contactSyncDto } from "./contact.dto.js"
import { validateBody } from "#middlewares/validate.middleware.js"
import { jwtValidate } from "#middlewares/jwt.middleware.js"
import { checkRole } from "#middlewares/role.middleware.js"

const router = express.Router();

router.post('/sync', jwtValidate, checkRole(["admin"]), validateBody(contactSyncDto), asyncCatch(contactController.sync));

export default router;