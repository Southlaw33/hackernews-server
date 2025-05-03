import { Hono } from "hono";
import { authenticationRoutes } from "./auth/auth-routes";
import { usersRoutes } from "./users/user-routes";
import { postsRoutes } from "./posts/post-routes";
import { likesRoutes } from "./likes/like-routes";
import { commentsRoutes } from "./comments/comment-routes";
import { authRoute } from "./middlewares/session-middleware";
import { cors } from "hono/cors";

export const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: "http://localhost:4000",

    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "token"],
    exposeHeaders: ["Set-Cookie"],
    maxAge: 600,
  })
);

allRoutes.route("/api/auth", authRoute);
allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);
