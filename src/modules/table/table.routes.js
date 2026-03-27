import express from "express"
import { tableController } from "./table.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";

const router = express.Router();

router.get('/', asyncCatch(tableController.getAllTables));

router.post('/', asyncCatch(tableController.addTable));

router.put('/:id', asyncCatch(tableController.updateTable));

router.delete('/:id', asyncCatch(tableController.deleteTable));

export default router

//TO-DO: admin check middleware