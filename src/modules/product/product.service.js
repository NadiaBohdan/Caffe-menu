import { productRepository } from "./product.repository.js";
import { ApiError } from "#utils/error.util.js";

export const productService = {
    async addProduct(data) {
        const isExists = await productRepository.getByTitle(data.title);
        if(isExists) throw new ApiError(409, "Product with same title already exists");

        const product = await productRepository.create(data);
        return product;
    },

    async getPaginated(cursorData) {
        const productList = await productRepository.getByPagination(cursorData);
        return productList;
    },

    async getById({ id }) {
        const product = await productRepository.getById(id);
        return product;
    },

    async deleteProduct({ id }) {
        await productRepository.delete(id);
    },

    async updateProduct(productList) {
        const updatedProductList = await productRepository.update(productList);
        return updatedProductList;
    }
}