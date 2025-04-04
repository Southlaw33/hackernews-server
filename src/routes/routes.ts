import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes.js";
import { usersRoutes } from "./user-routes.js";
import { postsRoutes } from "./post-routes.js";
import { likeRoutes } from "../routes/like-routes.js";
import { commentRoutes } from "./comment-routes.js";
import { logger } from "hono/logger";

export const allRoutes = new Hono();
allRoutes.use(logger());

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);
