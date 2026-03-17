import { ApiError } from "#utils/error.util";
import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError || err.name === 'ApiError') {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues[0]?.message || "Validation failed",
            details: err.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }
   
    console.error(err)
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}