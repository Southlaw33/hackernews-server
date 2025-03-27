import type { Post } from "@prisma/client";

export type GetPostResult = {
  posts: Post[];
};

export enum GetPostError {
  USER_NOT_FOUND,
  NO_POSTS,
  UNKNOWN,
}

export type CreatePostResult = {
  post: Post;
};

export enum CreatePostError {
  USER_NOT_FOUND,
  CONFLICTING_TITLE,
  UNKNOWN,
}
