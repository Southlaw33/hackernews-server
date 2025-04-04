import { prisma } from "../../extras/prisma";
import { paginate } from "../../routes/pagination";
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

export const getUsers = async (parameter: {
  page: number;
  limit: number;
}): Promise<GetUsersResult> => {
  try {
    const { skip, take } = paginate(parameter.page, parameter.limit);

    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      skip,
      take,
    });

    if (!users || users.length === 0) {
      throw GetUsersError.NO_USERS;
    }

    return { users };
  } catch (e) {
    console.error(e);
    throw GetUsersError.UNKNOWN;
  }
};
