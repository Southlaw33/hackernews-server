import type { Like } from "@prisma/client";

export type LikePostResult = {
  like: Like;
};

export enum LikePostError {
  POST_NOT_FOUND,
  ALREADY_LIKED,
  UNKNOWN,
}

export type GetLikesResult = {
  likes: Like[];
};

export enum GetLikesError {
  POST_NOT_FOUND,
  UNKNOWN,
}