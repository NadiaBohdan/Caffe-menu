import express from "express";
import { categoryController } from "./category.controller.js";
import { asyncCatch } from "#utils/asyncCatch.util.js";
import { validateBody, validateParams } from "#middlewares/validate.middleware.js";
import { createCategoryDto, updateCategoriesList } from "./categoty.dto.js";
import { idDto } from "#dto/global.dto.js";

const router = express.Router();

router.post('/', validateBody(createCategoryDto), asyncCatch(categoryController.addCategory));

router.put('/', validateBody(updateCategoriesList), asyncCatch(categoryController.updateCategories));

router.delete('/:id', validateParams(idDto), asyncCatch(categoryController.deleteCategory));

export default router;
