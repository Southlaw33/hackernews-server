import type { User } from "@prisma/client";
import { Sign } from "crypto";
import { createHash } from "crypto";
import { prisma } from "../../extras/prisma.ts";
import {
  LogInWithUsernameAndPasswordError,
  SignUpWithUsernameAndPasswordError,
  type LogInWithUsernameAndPasswordResult,
  type SignUpWithUsernameAndPasswordResult,
} from "./+types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client/extension";
import { jwtSecretKey } from "../../../environment";

const createPasswordHash = (parameters: { password: string }): string => {
  return createHash("sha256").update(parameters.password).digest("hex");
};

export const signUpWithUsernameAndPassword = async (parameters: {
  username: string;
  password: string;
}): Promise<SignUpWithUsernameAndPasswordResult> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: parameters.username,
    },
  });

  if (existingUser) {
    throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
  }
  const passwordHash = createPasswordHash({
    password: parameters.password,
  });
  const user = await prisma.user.create({
    data: {
      username: parameters.username,
      password: passwordHash,
    },
  });
  const JwtPayload: jwt.JwtPayload = {
    iss: "atchutha57@gmail.com",
    sub: user!.id,
    username: user!.username,
  };
  const token = jwt.sign(JwtPayload, jwtSecretKey, {
    expiresIn: "30d",
  });

  const result: SignUpWithUsernameAndPasswordResult = {
    token,
    user,
  };
  return result;
};

export const LogInWithUsernameAndPassword = async (parameters: {
  username: string;
  password: string;
}): Promise<LogInWithUsernameAndPasswordResult> => {
  //creating a password hash
  const passwordHash = createPasswordHash({
    password: parameters.password,
  });

  const user = await prisma.user.findUnique({
    where: {
      username: parameters.username,
      password: passwordHash,
    },
  });

  if (!user) {
    throw LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD;
  }

  const JwtPayload: jwt.JwtPayload = {
    iss: "atchutha57@gmail.com",
    sub: user.id,
    username: user.username,
  };
  const token = jwt.sign(JwtPayload, jwtSecretKey, {
    expiresIn: "30d",
  });

  return {
    token,
    user,
  };
};
