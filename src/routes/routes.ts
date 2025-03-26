import { Hono } from "hono";

import {
  LogInWithUsernameAndPassword,
  signUpWithUsernameAndPassword,
} from "../controllers/authentication/authentication-controller";
import {
  LogInWithUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
} from "../controllers/authentication/+types";

export const authenticationRoutes = new Hono();

authenticationRoutes.post("/sign-up", async (context) => {
  const { username, password } = await context.req.json();
  try {
    const result = await signUpWithUsernameAndPassword({
      username,
      password,
    });
    return context.json(
      {
        data: result,
        message: "all ok",
      },
      201
    );
  } catch (e) {
    if (e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
      return context.json(
        {
          message: "USername is already existing",
        },
        409
      );
    }
    if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
      return context.json(
        {
          message: "Server error",
        },
        500
      );
    }
  }
});