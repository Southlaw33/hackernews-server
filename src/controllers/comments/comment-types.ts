import type { Comment } from "@prisma/client";

export type CreateCommentResult = {
  commentId: string;
  content: string;
  createdAt: Date;
};

export enum CreateCommentError {
  POST_NOT_FOUND,
  UNKNOWN,
}
