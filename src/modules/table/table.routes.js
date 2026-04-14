import express from "express"
import { tableController } from "./table.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { createTableDto, updateTableDto } from "./table.dto.js";
import { idDto } from "#dto/global.dto.js";

const router = express.Router();

router.get('/', asyncCatch(tableController.getAllTables));

router.post('/', validateBody(createTableDto), asyncCatch(tableController.addTable));

router.put('/:id', validateBody(updateTableDto), validateParams(idDto), asyncCatch(tableController.updateTable));

router.delete('/:id', validateParams(idDto), asyncCatch(tableController.deleteTable));

export default router
