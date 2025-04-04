import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { prisma } from "../extras/prisma";
import { tokenMiddleWare } from "./middlewares/token-middleware";
import { GetMeError, GetUsersError } from "../controllers/users/user-types";
import { getMe, getUsers } from "../controllers/users/user-controllers";

import { paginate } from "./pagination";
export const users = new Hono();
users.get("/me", tokenMiddleWare, async (context) => {
  const userId = context.get("userId");

  try {
    const user = await getMe({
      userId,
    });

    return context.json(
      {
        data: user,
      },
      200
    );
  } catch (e) {
    if (e === GetMeError.BAD_REQUEST) {
      return context.json(
        {
          error: "User not found",
        },
        400
      );
    }

    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

// /users
users.get("/", tokenMiddleWare, async (context) => {
  try {
    const page = parseInt(context.req.query("page") || "1", 10);
    const limit = parseInt(context.req.query("limit") || "2", 10);
    const result = await getUsers({ page, limit });

    if (!result) {
      return context.json({ error: "Users not found" }, 404);
    }
    return context.json(result, 200);
  } catch (error) {
    if (error === GetUsersError.NO_USERS) {
      return context.json({ error: "Users not found" }, 404);
    }
    if (error === GetUsersError.UNKNOWN) {
      return context.json({ error: "Unknown error" }, 500);
    }
  }
});
