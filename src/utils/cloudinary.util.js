import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { ApiError } from "./error.util.js";

export const uploadToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "auto"
            },
            (error, result) => {
                if(error) return reject(new ApiError(400, `Upload file error: ${error.message}`));
                resolve(result);
            }
        )

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    })
}

export const deleteFromCloudinary = async (publicId) => {
    try {
        if(!publicId) return null;
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch(err) {
        console.log(`[ ERROR ] Failed to delete: ${publicId}, ${err.message}`);
    }
}