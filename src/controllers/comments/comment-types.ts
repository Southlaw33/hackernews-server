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

export type DeleteCommentResult = {
  success: boolean;
};

export enum DeleteCommentError {
  COMMENT_NOT_FOUND,
  UNAUTHORIZED,
  UNKNOWN,
}

export type UpdateCommentResult = {
  success: boolean;
  updatedComment: {
    commentId: string;
    content: string;
    updatedAt: Date;
  };
};

export enum UpdateCommentError {
  COMMENT_NOT_FOUND,
  UNAUTHORIZED,
  UNKNOWN,
}
