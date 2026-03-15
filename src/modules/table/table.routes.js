import express from "express"
import { tableController } from "./table.controller.js";

const router = express.Router();

router.get('/', tableController.getAllTables);

router.post('/', tableController.addTable);

router.put('/:id', tableController.updateTable);

router.delete('/:id', tableController.deleteTable);

export default router

//TO-DO: admin check middlware