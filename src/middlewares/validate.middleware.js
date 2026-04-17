import { ApiError } from "#utils/error.util.js";

export const validateBody = (schema) => (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Request body is required"));
    }

    const result = schema.safeParse(req.body);
    if (!result.success) {
        console.error("Validation error details:", result.error.format());
        return next(new ApiError(400, "Invalid data"));
    }

    req.body = result.data;
    next();
};

export const validateParams = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
        console.error("Validation error details:", result.error.format());
        return next(new ApiError(400, "Invalid params"));
    }

    req.params = result.data;
    next();
};

export const validateFile = (schema, isRequired = false) => (req, res, next) => {
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