import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes.js";
import { usersRoutes } from "./user-routes.js";
import { postsRoutes } from "./post-routes.js";
import { likeRoutes } from "./like-routes.js";
import { commentRoutes } from "./comment-routes.js";
import { openapi } from "../docs/openapi.js";
import { swaggerUI } from "@hono/swagger-ui";

export const allRoutes = new Hono();

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likeRoutes);
allRoutes.route("/comments", commentRoutes);

allRoutes.get("/doc", (c) => c.json(openapi));
allRoutes.get("/ui", swaggerUI({ url: "/doc" }));