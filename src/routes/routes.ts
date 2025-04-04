import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes";
<<<<<<< HEAD
=======
import { users } from "./user-routes";
>>>>>>> 702b18e165e7148aa41e79f52d35d77521481c19
import { prisma } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { logger } from "hono/logger";
<<<<<<< HEAD
=======
import { postRoute } from "./post-routes";
import { likePost } from "../controllers/likes/like-controllers";
import { likeRoute } from "./like-routes";
import { commentRoute } from "./comment-routes";
>>>>>>> 702b18e165e7148aa41e79f52d35d77521481c19

export const allRoutes = new Hono();

allRoutes.route("/authentication", authenticationRoutes);
<<<<<<< HEAD
=======
allRoutes.route("users", users);
allRoutes.route("/posts", postRoute);
allRoutes.route("/likes", likeRoute);
allRoutes.route("/comments", commentRoute);
>>>>>>> 702b18e165e7148aa41e79f52d35d77521481c19
allRoutes.use(logger());

allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All ok",
    },
    200
  );
});
