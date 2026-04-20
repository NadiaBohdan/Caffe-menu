import { comparePassword } from "./hash.util.js";
import { ApiError } from "./error.util.js";

export const verifyLoginData = async (user, password) => {
    if(!user) throw new ApiError(400, "Wrong password or login");

    const isSamePassword = await comparePassword(password , user.password);
    if(!isSamePassword) throw new ApiError(400, "Wrong password or login");
}