import { verifyToken } from "#utils/jwt.util.js";
import { ApiError } from "#utils/error.util.js";

export const jwtValidate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Please authorize first");
        }
        
        const token = authHeader.split(" ")[1];

        const decoded = await verifyToken(token);

        req.user = { id: decoded.id, role: decoded.role };

        next();
    } catch(err) {
        next(new ApiError(401, "Invalid or expired token"))
    }
}

export const jwtOptional = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
    } catch(err) {
        res.clearCookie("accessToken");
        req.user = null;
    }

    next();
}