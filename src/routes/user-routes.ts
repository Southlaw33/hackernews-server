import { Hono } from "hono";
import { tokenMiddleWare } from "./middlewares/token-middleware.js";
import { GetMe, GetUsers } from "../controllers/users/user-controllers.js";
import { GetAllUsersError, GetMeError } from "../controllers/users/user-types.js";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleWare, async (context) => {
  try {
    const userId = context.get("userId");
    const result = await GetMe({ userId });
    if (!result) {
      return context.json({ error: "User not found" }, 404);
    }
    return context.json(result, 200);
  } catch (error) {
    if (error === GetMeError.USER_NOT_FOUND) {
      return context.json({ error: "User not found" }, 404);
    }
    if (error === GetMeError.UNKNOWN) {
      return context.json({ error: "Unknown error" }, 500);
    }
  }
});

usersRoutes.get("/", tokenMiddleWare, async (context) => {
  try {
    const page = parseInt(context.req.query("page") || "1", 10);
    const limit = parseInt(context.req.query("limit") || "2", 10);
    const result = await GetUsers({ page, limit });

    if (!result) {
      return context.json({ error: "Users not found" }, 404);
    }
    return context.json(result, 200);
  } catch (error) {
    if (error === GetAllUsersError.NO_USERS_FOUND) {
      return context.json({ error: "Users not found" }, 404);
    }
    if (error === GetAllUsersError.UNKNOWN) {
      return context.json({ error: "Unknown error" }, 500);
    }
  }
});
