import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes";
import { usersRoutes } from "./user-routes";
import { postsRoutes } from "./post-routes";
import { likeRoutes } from "../routes/like-routes";
import { commentRoutes } from "./comment-routes";
import { logger } from "hono/logger";

export const allRoutes = new Hono();
allRoutes.use(logger());

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);
