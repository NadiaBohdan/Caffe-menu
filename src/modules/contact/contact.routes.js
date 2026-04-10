import express from "express"
import { contactController } from "./contact.controller.js"
import { asyncCatch } from "#utils/asyncCatch.util.js"
import { contactSyncDto } from "./contact.dto.js"
import { validateBody } from "#middlewares/validate.middleware.js"

const router = express.Router();

router.post('/sync', validateBody(contactSyncDto), asyncCatch(contactController.sync));

export default router;