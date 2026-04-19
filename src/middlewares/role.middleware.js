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

export const isOwner = (req, res, next) => {
    if(Number(req.user?.id) !== Number(req.params.id)) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        })
    }

    next();
}