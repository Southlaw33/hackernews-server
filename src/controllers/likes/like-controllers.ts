import type { Like } from "@prisma/client";
import { paginate } from "../../routes/pagination";
import { prisma } from "../../extras/prisma";
import {
  DeleteLikeError,
  GetLikesError,
  LikePostError,
  type DeleteLikeResult,
  type GetLikesResult,
  type LikePostResult,
} from "./like-types";

//like a post
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

//get all likes on a post in reverse chronological order
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

//Delete a like (or can be dislike)
export const deleteLike = async (parameters: {
  userId: string;
  postId: string;
}): Promise<DeleteLikeResult> => {
  const { userId, postId } = parameters;

  const post = await prisma.post.findUnique({
    where: { postId },
  });

  if (!post) {
    throw DeleteLikeError.POST_NOT_FOUND;
  }

  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (!like) {
    throw DeleteLikeError.LIKE_NOT_FOUND;
  }

  await prisma.like.delete({
    where: { likeId: like.likeId },
  });

  return { success: true };
};
