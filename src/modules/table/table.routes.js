import express from "express"
import { tableController } from "./table.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { createTableDto, updateTableDto } from "./table.dto.js";
import { idDto } from "#dto/global.dto.js";
import { jwtValidate } from "#middlewares/jwt.middleware.js";
import { checkRole } from "#middlewares/role.middleware.js";

const router = express.Router();

router.get('/', jwtValidate, checkRole(["admin"]), asyncCatch(tableController.getAllTables));

router.post('/', jwtValidate, checkRole(["admin"]), validateBody(createTableDto), asyncCatch(tableController.addTable));

router.put('/:id', jwtValidate, checkRole(["admin"]), validateBody(updateTableDto), validateParams(idDto), asyncCatch(tableController.updateTable));

router.delete('/:id', jwtValidate, checkRole(["admin"]), validateParams(idDto), asyncCatch(tableController.deleteTable));

export default router
