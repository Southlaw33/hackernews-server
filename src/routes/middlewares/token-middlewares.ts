import { createMiddleware } from "hono/factory";
import { JWT_SECRET_KEY } from "../../environment.js";
import jwt from "jsonwebtoken";

export const tokenMiddleWare = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (context, next) => {
  const token = context.req.header("token");
  if (!token) {
    return context.json({ message: "Token missing , Unauthorized" }, 401);
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
    const userId = verified.sub;
    if (userId) {
      context.set("userId", userId);
    }
    console.log(verified);
    await next();
  } catch (e) {
    return context.json({ message: "Invalid token" }, 401);
  }
});
