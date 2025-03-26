import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { prisma } from "../extras/prisma";
import { tokenMiddleWare } from "./middlewares/token-middleware";
import { GetMeError, GetUsersError } from "../controllers/users/user-types";
import { getMe, getUsers } from "../controllers/users/user-controllers";

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
users.get("", tokenMiddleWare, async (context) => {
  try {
    const users = await getUsers();

    return context.json(
      {
        data: users,
      },
      200
    );
  } catch (e) {
    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});
