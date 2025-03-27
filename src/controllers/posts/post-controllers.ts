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
