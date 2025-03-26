import { prisma } from "../../extras/prisma";
import {
  GetMeError,
  GetUsersError,
  type GetMeResult,
  type GetUsersResult,
} from "./user-types";

export const getMe = async (parameters: {
  userId: string;
}): Promise<GetMeResult> => {
  const user = await prisma.user.findUnique({
    where: {
      id: parameters.userId,
    },
  });

  if (!user) {
    throw GetMeError.BAD_REQUEST;
  }

  return {
    user,
  };
};

export const getUsers = async (): Promise<GetUsersResult> => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw GetUsersError.NO_USERS;
  }
  return {
    users,
  };
};
