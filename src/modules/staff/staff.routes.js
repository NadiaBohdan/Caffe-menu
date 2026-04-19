import express from "express"
import { staffController } from "./staff.controller.js"
import { createStaffDto, updateStaffDto } from "./staff.dto.js"
import { idDto } from "#dto/global.dto.js"
import { validateBody, validateParams } from "#middlewares/validate.middleware.js"
import { jwtValidate } from "#middlewares/jwt.middleware.js"
import { checkRole } from "#middlewares/role.middleware.js"
import { asyncCatch } from "#utils/asyncCatch.util.js"

const router = express.Router();

router.post('/', jwtValidate, checkRole(["admin"]), validateBody(createStaffDto), asyncCatch(staffController.add));

router.put('/:id', jwtValidate, checkRole(["admin"]), validateBody(updateStaffDto), validateParams(idDto), asyncCatch(staffController.update));

router.delete('/:id', jwtValidate, checkRole(["admin"]), validateParams(idDto), asyncCatch(staffController.delete));

export default router;