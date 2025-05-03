import { createMiddleware } from "hono/factory";
import { jwtSecretKey } from "../../../environment";
import jwt from "jsonwebtoken";
export const tokenMiddleWare = createMiddleware(async (context, next) => {
    const token = context.req.header("token");
    if (!token) {
        return context.json({ message: "Token missing , Unauthorized" }, 401);
    }
    try {
        const verified = jwt.verify(token, jwtSecretKey);
        const userId = verified.sub;
        if (userId) {
            context.set("userId", userId);
        }
        console.log(verified);
        await next();
    }
    catch (e) {
        return context.json({ message: "Invalid token" }, 401);
    }
});
