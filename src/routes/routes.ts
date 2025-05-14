import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

import { authenticationRoutes } from "./authentication/authentication-routes.js";
import { usersRoutes } from "./users/users-routes.js";
import { postsRoutes } from "./posts/posts-routes.js";
import { likesRoutes } from "./likes/likes-routes.js";
import { commentsRoutes } from "./comments/comments-routes.js";

import { cors } from "hono/cors";
import { authRoute } from "./middlewares/session-middleware.js";
import { webClientUrl } from "../environment.js";

export const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: [webClientUrl],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "token"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

allRoutes.get("/ui", swaggerUI({ url: "/docs" }));

allRoutes.route("/api/auth", authRoute);
allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);
