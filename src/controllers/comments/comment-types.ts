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

export type GetCommentsResult = {
  comments: {
    commentId: string;
    content: string;
    createdAt: Date;
    username: string;
  }[];
};

export enum GetCommentsError {
  POST_NOT_FOUND,
  UNKNOWN,
}
