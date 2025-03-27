import type { Comment } from "@prisma/client";
import { CreateCommentError, type CreateCommentResult } from "./comment-types";
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
