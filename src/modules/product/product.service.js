import { productRepository } from "./product.repository.js";
import { ApiError } from "#utils/error.util.js";
import { uploadToCloudinary, deleteFromCloudinary } from "#utils/cloudinary.util.js";

const folder = "products"

export const productService = {
    async addProduct(data) {
        const isExists = await productRepository.getByTitle(data.title);
        if(isExists) throw new ApiError(409, "Product with same title already exists");

        let uploadData = null;

        try {
            uploadData = await uploadToCloudinary(data.buffer, folder);

            const { buffer, ...cleanData } = data;

            const dbData = { 
                ...cleanData, 
                ...(uploadData && {
                    imgPath: uploadData.secure_url,
                    publicId: uploadData.public_id
                }) 
            };

            const product = await productRepository.create(dbData);
            return product;
        } catch(err) {
            if(uploadData?.public_id) {
                await deleteFromCloudinary(uploadData.public_id);
            }

            if(err instanceof ApiError) throw err;
            throw new ApiError(500, err.message || "Internal Server Error");
        }
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