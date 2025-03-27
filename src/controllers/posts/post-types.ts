import type { Post } from "@prisma/client";

export type GetPostResult = {
  post: Post;
};

export enum GetPostError {
  POST_NOT_FOUND,
  UNKNOWN,
}
