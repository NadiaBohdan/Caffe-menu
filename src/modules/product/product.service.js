import { productRepository } from "./product.repository.js";
import { ApiError } from "#utils/error.util.js";
import { uploadToCloudinary, deleteFromCloudinary } from "#utils/cloudinary.util.js";

const FOLDER = "products"

export const productService = {
    async add(data) {
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


    async getPaginated(cursorData) {
        const productList = await productRepository.getByPagination(cursorData);
        return productList;
    },

    async getById({ id }) {
        const product = await productRepository.getById(id);
        return product;
    },

    async delete({ id }) {
        const existingProduct = await productRepository.getById(id);
        if(!existingProduct) throw new ApiError(404, "Product not found");

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
        const existingProduct = await productRepository.getById(data.id);
        if(!existingProduct) throw new ApiError(404, "Product not found");

        const isTitleExists = await productRepository.getByTitle(data.title);
        if(isTitleExists && isTitleExists.id !== existingProduct.id) throw new ApiError(409, "Product with same title already exists");

        let uploadData = null;

        try {
            if(data.buffer) {
                uploadData = await uploadToCloudinary(data.buffer, FOLDER);
            }
            
            const { buffer, ...updateData } = data;

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