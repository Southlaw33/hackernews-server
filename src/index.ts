import "dotenv/config";
<<<<<<< HEAD
=======
import "dotenv/config";
>>>>>>> 702b18e165e7148aa41e79f52d35d77521481c19
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes/routes";
import { Hono } from "hono";

serve(allRoutes, (info) => {
  console.log(`server is running on port ${info.port}`);
});
<<<<<<< HEAD
=======

>>>>>>> 702b18e165e7148aa41e79f52d35d77521481c19
