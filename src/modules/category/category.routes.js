import exress from "express";
import { categoryController } from "./category.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util";

const router = exress.Router();

router.post('/', asyncCatch(categoryController.addCategory));

router.put('/', asyncCatch(categoryController.updateCategory));

router.delete('/:id', asyncCatch(categoryController.deleteCategory));

export default router;
