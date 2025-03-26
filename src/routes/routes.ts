import { Hono } from "hono";
import { authenticationRoutes } from "./auth-routes";
import { prisma } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { logger } from "hono/logger";

export const allRoutes = new Hono();

allRoutes.route("/authentication", authenticationRoutes);
allRoutes.use(logger());

allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All ok",
    },
    200
  );
});
