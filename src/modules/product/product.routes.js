import express from 'express';
import { asyncCatch } from '#utils/asyncCatch.util.js';
import { createProductDto, updateProductDto, updateProductSortDto, fileDto } from './product.dto.js';
import { idDto } from '#dto/global.dto.js';
import { validateBody, validateParams, validateFile } from '#middlewares/validate.middleware.js';
import { productController } from './product.controller.js';
import { upload } from '#middlewares/multer.middleware.js';
import { jwtValidate } from '#middlewares/jwt.middleware.js';
import { checkRole } from '#middlewares/role.middleware.js';

const router = express.Router();

router.post('/', jwtValidate, checkRole(["admin"]), upload.single("image"), validateBody(createProductDto), validateFile(fileDto), asyncCatch(productController.add));

router.put('/:id', jwtValidate, checkRole(["admin"]), upload.single("image"), validateBody(updateProductDto), validateParams(idDto), validateFile(fileDto), asyncCatch(productController.updateOne));

router.patch('/sort', jwtValidate, checkRole(["admin"]), validateBody(updateProductSortDto), asyncCatch(productController.updateMany));

router.delete('/:id', jwtValidate, checkRole(["admin"]), validateParams(idDto), asyncCatch(productController.delete));

export default router;