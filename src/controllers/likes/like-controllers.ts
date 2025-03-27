import type { Like } from "@prisma/client";
import { paginate } from "../../routes/pagination";
import { prisma } from "../../extras/prisma";
import { LikePostError, type LikePostResult } from "./like-types";

export const likePost = async (parameters: {
  userId: string;
  postId: string;
}): Promise<LikePostResult> => {
  const { userId, postId } = parameters;

  const post = await prisma.post.findUnique({
    where: { postId },
  });
  //check if the post exists
  if (!post) {
    throw LikePostError.POST_NOT_FOUND;
  }
  //check if user has already like this post
  const existingLike = await prisma.like.findFirst({
    where: {
      postId: parameters.postId,
      userId: parameters.userId,
    },
  });

  if (existingLike) {
    throw LikePostError.ALREADY_LIKED;
  }

  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  return { like };
};
