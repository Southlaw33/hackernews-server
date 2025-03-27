import { prisma } from "../../extras/prisma";
import { paginate } from "../../routes/pagination";

import {
  GetPostError,
  CreatePostError,
  DeletePostError,
  type CreatePostResult,
  type GetPostResult,
  type DeletePostResult,
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

export const getAllPosts = async (parameters: {
  page?: number;
  limit?: number;
}): Promise<GetPostResult> => {
  const { page = 1, limit = 10 } = parameters;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" }, // Reverse chronological order
    skip: (page - 1) * limit,
    take: limit,
  });

  return { posts };
};

export const deletePost = async (parameters: {
  userId: string;
  postId: string;
}): Promise<DeletePostResult> => {
  const { userId, postId } = parameters;

  const post = await prisma.post.findUnique({
    where: { postId },
  });

  if (!post) {
    throw DeletePostError.POST_NOT_FOUND;
  }

  if (post.userid !== userId) {
    throw DeletePostError.UNAUTHORIZED;
  }

  await prisma.post.delete({
    where: { postId },
  });

  return { success: true };
};
