import { prisma } from "../../extras/prisma";
import { paginate } from "../../routes/pagination";

import {
  GetPostError,
  CreatePostError,
  type CreatePostResult,
  type GetPostResult,
} from "./post-types";

export const createPost = async (parameters: {
  userId: string;
  title: string;
  description?: string;
}): Promise<CreatePostResult> => {
  const existingUser = await prisma.user.findUnique({
    where: { id: parameters.userId },
  });

  if (!existingUser) {
    throw CreatePostError.USER_NOT_FOUND;
  }

  const post = await prisma.post.create({
    data: {
      title: parameters.title,
      description: parameters.description,
      userid: parameters.userId,
    },
  });

  return { post };
};

export const getMyPosts = async (parameters: {
  userId: string;
  page?: number;
  limit?: number;
}): Promise<GetPostResult> => {
  const { userId, page = 1, limit = 10 } = parameters;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw GetPostError.USER_NOT_FOUND;
  }

  const posts = await prisma.post.findMany({
    where: {
      userid: userId,
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    posts,
  };
};
