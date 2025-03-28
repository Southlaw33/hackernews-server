import type { Comment } from "@prisma/client";
import {
  CreateCommentError,
  DeleteCommentError,
  GetCommentsError,
  type CreateCommentResult,
  type DeleteCommentResult,
  type GetCommentsResult,
} from "./comment-types";
import { prisma } from "../../extras/prisma";

//controller to create a comment
export const createComment = async (parameters: {
  userId: string;
  postId: string;
  content: string;
}): Promise<CreateCommentResult> => {
  const { userId, postId, content } = parameters;
  const post = await prisma.post.findUnique({ where: { postId } });
  if (!post) {
    throw CreateCommentError.POST_NOT_FOUND;
  }
  const comment = await prisma.comment.create({
    data: {
      userId,
      postId,
      content,
    },
  });
  return {
    commentId: comment.commentId,
    content: comment.content,
    createdAt: comment.createdAt,
  };
};

//controller to get all the comments on a post in reverese chronological order
export const getCommentsOnPost = async (parameters: {
  postId: string;
  page?: number;
  limit?: number;
}): Promise<GetCommentsResult> => {
  const { postId, page = 1, limit = 10 } = parameters;

  const post = await prisma.post.findUnique({
    where: { postId },
  });

  if (!post) {
    throw GetCommentsError.POST_NOT_FOUND;
  }

  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      user: {
        select: { username: true },
      },
    },
  });

  return {
    comments: comments.map((comment) => ({
      commentId: comment.commentId,
      content: comment.content,
      createdAt: comment.createdAt,
      username: comment.user.username,
    })),
  };
};

//controller to delete a comment wrt the commentID
export const deleteComment = async (parameters: {
  userId: string;
  commentId: string;
}): Promise<DeleteCommentResult> => {
  const { userId, commentId } = parameters;

  const comment = await prisma.comment.findUnique({
    where: { commentId: commentId },
  });
  //cjeck if comment is present

  if (!comment) {
    throw DeleteCommentError.COMMENT_NOT_FOUND;
  }

  if (comment.userId !== userId) {
    throw DeleteCommentError.UNAUTHORIZED;
  }

  await prisma.comment.delete({
    where: { commentId: commentId },
  });

  return { success: true };
};
