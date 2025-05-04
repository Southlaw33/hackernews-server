import { Hono } from "hono";
import { authenticationRoutes } from "./auth/auth-routes";
import { usersRoutes } from "./users/user-routes";
import { postsRoutes } from "./posts/post-routes";
import { likesRoutes } from "./likes/like-routes";
import { commentsRoutes } from "./comments/comment-routes";
import { authRoute } from "./middlewares/session-middleware";
import { cors } from "hono/cors";

// Adjust the origin to match your frontend URL (3001 or 4000)
export const allRoutes = new Hono();

// Allow cross-origin requests from frontend (you can allow multiple origins here)
allRoutes.use(
  cors({
    origin: ["https://hackernews-web-hazel.vercel.app/"], // Add your actual frontend origin here
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
