import express from 'express';
import { asyncCatch } from '#utils/asyncCatch.util.js';
import { createProductDto, updateProductDto, productIdDto } from './product.dto.js';
import { validateBody, validateParams } from '#middlewares/validate.middleware.js';
import { productController } from './product.controller.js';

const router = express.Router();

router.post('/', validateBody(createProductDto), asyncCatch(productController.addProduct));

router.put('/:id', validateBody(updateProductDto), validateParams(productIdDto), asyncCatch(productController.updateProduct));

router.delete('/:id', validateParams(productIdDto), asyncCatch(productController.deleteProduct));

export default router;