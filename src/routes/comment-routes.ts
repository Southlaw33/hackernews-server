import type { Comment } from "@prisma/client";
import { paginate } from "./pagination";
import { prisma } from "../extras/prisma";
import { Hono } from "hono";
import { createComment } from "../controllers/comments/comment-controllers";
import {
  CreateCommentError,
  type CreateCommentResult,
} from "../controllers/comments/comment-types";
import { tokenMiddleWare } from "./middlewares/token-middleware";

export const commentRoute = new Hono();

commentRoute.post("/on/:postId", tokenMiddleWare, async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");
  const { content } = await c.req.json();
  if (!userId) {
    return c.json(
      {
        message: "Unauthorized",
      },
      401
    );
  }
  try {
    const result = await createComment({ userId, postId, content });
    return c.json({ data: result }, 201);
  } catch (e) {
    if (e === CreateCommentError.POST_NOT_FOUND) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }
    return c.json(
      {
        message: "Internal Server error",
      },
      500
    );
  }
});
