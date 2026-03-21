import { ApiError } from "#utils/error.util";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorHandler = (err, req, res, next) => {
    if(err instanceof Prisma.PrismaClientKnownRequestError) {
        const PrismaError = {
            P2002: { message: "Element already exists", status: 409 },
            P2003: { message: "Delete error",  status: 400 },
            P2025: { message: "Element with this id do not exists", status: 404 },
            P2000: { message: "Value too long", status: 400 },
            P2005: { message: "Invalid data type", status: 400 },
            P2006: { message: "Wrong data", status: 400 }
        }

        const error = PrismaError[err.code]

        if(!error) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            })
        }

        return res.status(error.status).json({
            success: false,
            message: error.message
        })
    }

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