import { verifyToken } from "#utils/jwt.util.js";
import { ApiError } from "#utils/error.util.js";

export const jwtValidate = (req, res, next) => {
    try {
        const authHeder = req.heders.authorization;

        if(!authHeder || !authHeder.startsWith("Bearer ")) {
            throw new ApiError(401, "Please authorize first");
        }

        const token = authHeder.split(" ")[1];

        const decoded = await await verifyToken(token);

        req.userId = decoded.id;

        next();
    } catch(err) {
        next(new ApiError(401, "Invalid or exprired token"))
    }
}