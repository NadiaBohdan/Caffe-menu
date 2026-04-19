export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const requestRole = req.user?.role;

        if(!requestRole || !allowedRoles.includes(requestRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied: insufficient permissions"
            })
        }

        next();
    } 
}