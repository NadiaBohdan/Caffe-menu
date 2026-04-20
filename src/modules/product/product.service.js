import { productRepository } from "./product.repository.js";
import { categoryService } from "#category/category.service.js";
import { ApiError } from "#utils/error.util.js";
import { uploadToCloudinary, deleteFromCloudinary } from "#utils/cloudinary.util.js";

const FOLDER = "products"

export const productService = {
    async add(data) {
        await categoryService.getById({ id: data.categoryId });

        const isExists = await productRepository.getByTitle(data.title);
        if(isExists) throw new ApiError(409, "Product with same title already exists");

        let uploadData = null;

        try {
            if(data.buffer) {
                uploadData = await uploadToCloudinary(data.buffer, FOLDER);
            }
        
            const { buffer, ...cleanData } = data;

            const payload = { 
                ...cleanData, 
                ...(uploadData && {
                    fileURL: uploadData.secure_url,
                    publicId: uploadData.public_id
                }) 
            };

            const product = await productRepository.create(payload);
            return product;
        } catch(err) {
            if(uploadData?.public_id) {
                await deleteFromCloudinary(uploadData.public_id);
            }

            if(err instanceof ApiError) throw err;
            throw new ApiError(500, err.message || "Internal Server Error");
        }
    },

    async getByCategory() {

    },

    async getPaginated(cursorData) {
        const productList = await productRepository.getByPagination(cursorData);
        return productList;
    },

    async getById({ id }) {
        const product = await productRepository.getById(id);
        if(!product) throw new ApiError(404, "Product not found");

        return product;
    },

    async delete({ id }) {
        const existingProduct = await this.findById(id)

        try {
            if(existingProduct.file?.publicId) {
                await deleteFromCloudinary(existingProduct.file.publicId)
            }
        } catch(err) {
            console.error("[ ERROR ] Cloudinary delete error:", err);
        }
        
        return await productRepository.delete(id);
    },

    async updateMany(productList) {
        const products = await productRepository.update(productList);
        return products;
    },

    async updateOne(data) {
        if(data.categoryId) {
            await categoryService.getById({ id: data.categoryId });
        }

        const existingProduct = await productService.findById(data.id);

        const isTitleExists = await productRepository.getByTitle(data.title);
        if(isTitleExists && isTitleExists.id !== existingProduct.id) throw new ApiError(409, "Product with same title already exists");

        let uploadData = null;

        try {
            if(data.buffer) {
                uploadData = await uploadToCloudinary(data.buffer, FOLDER);
            }

            if(data.fileToDelete) {
                await deleteFromCloudinary(existingProduct.publicId, FOLDER);
            }
            
            const { buffer, fileToDelete, ...updateData } = data;

            const payload = {
                ...updateData,
                ...(uploadData && {
                    fileURL: uploadData.secure_url,
                    publicId: uploadData.public_id,
                    fileId: existingProduct.fileId
                })
            }

            const [updatedProduct] = await productRepository.update([payload]);

            if(uploadData && existingProduct.file?.publicId) {
                await deleteFromCloudinary(existingProduct.file.publicId);
            }

            return updatedProduct;
        } catch(err) {
            if(uploadData?.public_id) {
                await deleteFromCloudinary(uploadData.public_id);
            }

            if(err instanceof ApiError) throw err;
            throw new ApiError(500, err.message || "Internal Server Error");
        }
    }
}