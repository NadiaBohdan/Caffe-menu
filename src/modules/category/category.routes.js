import express from "express";
import { categoryController } from "./category.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { createCategoryDto, updateCategoryDto, categoryIdDto } from "./categoty.dto.js";

const router = express.Router();

router.post('/', validateBody(createCategoryDto), asyncCatch(categoryController.addCategory));

router.put('/', validateBody(updateCategoryDto), asyncCatch(categoryController.updateCategories));

router.delete('/:id', validateParams(categoryIdDto), asyncCatch(categoryController.deleteCategory));

export default router;
