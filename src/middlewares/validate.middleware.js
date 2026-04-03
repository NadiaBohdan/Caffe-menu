export const validateBody = (schema) => (req, res, next) => {
    try {
        console.log("[INFO] Try validate: ", req.body)
        req.body = schema.parse(req.body);
        console.log("[INFO] Validate output: ", req.body)
        next()
    } catch(err) {
        next(err);
    }
}

export const validateParams = (schema) => (req, res, next) => {
    try {
        req.params = schema.parse(req.params);
        next()
    } catch(err) {
        next(err);
    }
}

export const validateFile = (schema) => (req, res, next) => {
    try {
        if(!req.file) return next();

        req.file = schema.parse(req.file);
        next()
    } catch(err) {
        next(err)
    }
}