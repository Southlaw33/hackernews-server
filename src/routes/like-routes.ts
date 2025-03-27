import { Hono } from "hono";
import {
  deleteLike,
  getLikesOnPost,
  likePost,
} from "../controllers/likes/like-controllers";
import {
  DeleteLikeError,
  GetLikesError,
  LikePostError,
} from "../controllers/likes/like-types";
import { prisma } from "../extras/prisma";
import { tokenMiddleWare } from "./middlewares/token-middleware";

export const likeRoute = new Hono();

//route to like a post
likeRoute.post("/on/:postId", tokenMiddleWare, async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  try {
    const result = await likePost({ userId, postId });

    return c.json(
      {
        data: result,
      },
      201
    );
  } catch (e) {
    if (e === LikePostError.POST_NOT_FOUND) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }

    if (e === LikePostError.ALREADY_LIKED) {
      return c.json(
        {
          error: "User has already liked this post",
        },
        409
      );
    }

    return c.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

//route to get all likes
likeRoute.get("/on/:postId", async (c) => {
  const postId = c.req.param("postId");
  const page = Number(c.req.query("page")) || 1;
  const limit = Number(c.req.query("limit")) || 10;

  try {
    const result = await getLikesOnPost({ postId, page, limit });

    return c.json(
      {
        data: result,
      },
      200
    );
  } catch (e) {
    if (e === GetLikesError.POST_NOT_FOUND) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

//route to delete like
likeRoute.delete("/on/:postId", tokenMiddleWare, async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  try {
    const result = await deleteLike({ userId, postId });

    return c.json(
      {
        data: result,
      },
      200
    );
  } catch (e) {
    if (e === DeleteLikeError.POST_NOT_FOUND) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }

    if (e === DeleteLikeError.LIKE_NOT_FOUND) {
      return c.json(
        {
          error: "Like not found",
        },
        404
      );
    }

    return c.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});
