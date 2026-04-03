import express from 'express';
import { asyncCatch } from '#utils/asyncCatch.util.js';
import { createProductDto, updateProductDto, updateProductSortDto, productIdDto, fileDto } from './product.dto.js';
import { validateBody, validateParams, validateFile } from '#middlewares/validate.middleware.js';
import { productController } from './product.controller.js';
import { upload } from '#middlewares/multer.middleware.js';

const router = express.Router();

router.post('/', upload.single("image"), validateBody(createProductDto), validateFile(fileDto), asyncCatch(productController.add));

router.put('/:id', upload.single("image"), validateBody(updateProductDto), validateParams(productIdDto), validateFile(fileDto), asyncCatch(productController.updateOne));

router.patch('/sort', validateBody(updateProductSortDto), asyncCatch(productController.updateMany));

router.delete('/:id', validateParams(productIdDto), asyncCatch(productController.delete));

export default router;