import multer from "multer";
import { ApiError } from "#utils/error.util.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith('image/')) {
        return cb(new ApiError(400, "You can upload only images"), false);
    }

    cb(null, true);
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});