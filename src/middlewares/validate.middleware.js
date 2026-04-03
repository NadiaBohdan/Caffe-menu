import { ApiError } from "#utils/error.util.js";

export const validateBody = (schema) => (req, res, next) => {
    try {
        if(!req.body) throw new ApiError(400, "Invalid data");

        console.log("[INFO] Try validate: ", req.body)
        req.body = schema.parse(req.body);
        console.log("[INFO] Validate output: ", req.body)
        next()
    } catch(err) {
        next(err);
    }
}

export const validateParams = (schema) => (req, res, next) => {
    try {
        if(!req.params) throw new ApiError(400, "Invalid data");

        req.params = schema.parse(req.params);
        next()
    } catch(err) {
        next(err);
    }
}

export const validateFile = (schema, isRequired) => (req, res, next) => {
    try {
        if(!req.file) {
            if(isRequired) throw new ApiError(400, "Invalid data");

            return next()
        }

        req.file = schema.parse(req.file);
        next()
    } catch(err) {
        next(err)
    }
}