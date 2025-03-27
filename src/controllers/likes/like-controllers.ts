import type { Like } from "@prisma/client";
import { paginate } from "../../routes/pagination";
import { prisma } from "../../extras/prisma";
import { GetLikesError, LikePostError, type GetLikesResult, type LikePostResult } from "./like-types";

//LIKE A POST
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

export const getLikesOnPost = async (parameters: {
  postId: string;
  page?: number;
  limit?: number;
}): Promise<GetLikesResult> => {
  const { postId, page = 1, limit = 10 } = parameters;

  const post = await prisma.post.findUnique({
    where: { postId },
  });

  if (!post) {
    throw GetLikesError.POST_NOT_FOUND;
  }

  const likes = await prisma.like.findMany({
    where: { postId },
    orderBy: { likedAt: "desc" }, // Reverse chronological order
    skip: (page - 1) * limit,
    take: limit,
  });

  return { likes };
};