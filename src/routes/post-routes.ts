import { Hono } from "hono";
import { prisma } from "../extras/prisma";

import { createPost, getMyPosts } from "../controllers/posts/post-controllers";
import { CreatePostError, GetPostError } from "../controllers/posts/post-types";
import { tokenMiddleWare } from "./middlewares/token-middleware";

export const postRoute = new Hono();

postRoute.post("/", tokenMiddleWare, async (c) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );
    }
    const { title, description } = await c.req.json();

    const result = await createPost({ userId, title, description });
    return c.json(
      {
        data: result,
      },
      201
    );
  } catch (e) {
    if (e === CreatePostError.USER_NOT_FOUND) {
      return c.json(
        {
          message: "User not found",
        },
        404
      );
    }
    if (e === CreatePostError.CONFLICTING_TITLE) {
      return c.json(
        {
          message: "Title already exists",
        },
        409
      );
    }
    return c.json(
      {
        message: " THis a Server error",
      },
      500
    );
  }
});

postRoute.get("/me", tokenMiddleWare, async (context) => {
  const userId = context.get("userId");
  const page = context.req.query("page");
  const limit = context.req.query("limit");

  try {
    const result = await getMyPosts({
      userId,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });

    return context.json(
      {
        data: result,
      },
      200
    );
  } catch (e) {
    if (e === GetPostError.USER_NOT_FOUND) {
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
