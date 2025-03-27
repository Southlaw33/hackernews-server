import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes";
import { users } from "./user-routes";
import { prisma } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { logger } from "hono/logger";
import { postRoute } from "./post-routes";

export const allRoutes = new Hono();

allRoutes.route("/authentication", authenticationRoutes);
allRoutes.route("users", users);
allRoutes.route("/posts", postRoute)
allRoutes.use(logger());

allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All ok",
    },
    200
  );
});
