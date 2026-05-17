import { verifyToken } from "#utils/jwt.util.js";
import { ApiError } from "#utils/error.util.js";

export const jwtValidate = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token) {
            throw new ApiError(401, "Please authorize first");
        }
        
        const decoded = await verifyToken(token);

        req.user = { id: decoded.id, role: decoded.role };

        next();
    } catch(err) {
        next(new ApiError(401, "Invalid or expired token"))
    }
}

export const jwtValidateSSR = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token) {
            res.redirect('/login');
            return;
        }

        const decoded = await verifyToken(token);

        req.user = { id: decoded.id, role: decoded.role };

        next();
    } catch(err) {
        res.redirect('/login');
    }
}

export const jwtOptional = async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = await verifyToken(token);

        req.user = { id: decoded.id, role: decoded.role };
    } catch(err) {
        res.clearCookie("accessToken");
        req.user = null;
    }

    next();
}