import { ApiError } from "#utils/error.util";

export const errorHandler = (err, req, res, next) => {
    if(err instanceof ApiError || err.name === 'ApiError') {
        return res.status(err.status).json({
            success: false,
            message: err.message
        })
    }

    console.error(err)
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}