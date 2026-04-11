import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
}