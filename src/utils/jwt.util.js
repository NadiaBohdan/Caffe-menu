import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET
const JWT_TTL = '1d'

export const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TTL }, (err, token) => {
            if(err) reject(err);
            resolve(token)
        })
    })
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) reject(err);
            resolve(decoded);
        })
    })
}