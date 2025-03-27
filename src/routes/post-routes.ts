import { Hono } from "hono";
import { prisma } from "../extras/prisma";

import {
  createPost,
  deletePost,
  getAllPosts,
  getMyPosts,
} from "../controllers/posts/post-controllers";
import {
  CreatePostError,
  DeletePostError,
  GetPostError,
} from "../controllers/posts/post-types";
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

//get all posts by me in reverse chronological order
postRoute.get("/me", tokenMiddleWare, async (c) => {
  const userId = c.get("userId");
  const page = c.req.query("page");
  const limit = c.req.query("limit");

  try {
    const result = await getMyPosts({
      userId,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });

    return c.json(
      {
        data: result,
      },
      200
    );
  } catch (e) {
    if (e === GetPostError.USER_NOT_FOUND) {
      return c.json(
        {
          error: "User not found",
        },
        400
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

//get all posts in descending order (reverse chronoclogical order)
postRoute.get("/all", tokenMiddleWare, async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const limit = parseInt(c.req.query("limit") || "2", 10);
    const allPosts = await getAllPosts({ page, limit });
    if (!allPosts) {
      return c.json({ error: "No posts found" }, 404);
    }
    return c.json({ data: allPosts }, 200);
  } catch (e) {
    return c.json({ error: e }, 500);
  }
});

postRoute.delete("/:postId", tokenMiddleWare, async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  try {
    const result = await deletePost({ userId, postId });

    return c.json(
      {
        success: result.success,
      },
      200
    );
  } catch (e) {
    if (e === DeletePostError.POST_NOT_FOUND) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }

    if (e === DeletePostError.UNAUTHORIZED) {
      return c.json(
        {
          error: "Unauthorized to delete this post",
        },
        403
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
