import "dotenv/config";
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes";
import { Hono } from "hono";

serve(allRoutes, (info) => {
  console.log(`server is running on port ${info.port}`);
});
