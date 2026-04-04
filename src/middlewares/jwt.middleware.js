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

        req.user = { id: decoded.id };

        next();
    } catch(err) {
        next(new ApiError(401, "Invalid or expired token"))
    }
}