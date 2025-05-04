import { Hono } from "hono";
import { authenticationRoutes } from "./auth/auth-routes.js";
import { usersRoutes } from "./users/user-routes.js";
import { postsRoutes } from "./posts/post-routes.js";
import { likesRoutes } from "./likes/like-routes.js";
import { commentsRoutes } from "./comments/comment-routes.js";
import { authRoute } from "./middlewares/session-middleware.js";
import { cors } from "hono/cors";

// Adjust the origin to match your frontend URL (3001 or 4000)
export const allRoutes = new Hono();

// Allow cross-origin requests from frontend (you can allow multiple origins here)
allRoutes.use(
  cors({
    origin: ["https://hackernews-web-hazel.vercel.app"], // Add your actual frontend origin here
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies to be included
    allowHeaders: ["Content-Type", "Authorization", "token"],
    exposeHeaders: ["Set-Cookie"], // Expose the Set-Cookie header
    maxAge: 600, // Cache pre-flight response for 10 minutes
  })
);

// Your existing routes
allRoutes.route("/api/auth", authRoute);
allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);
