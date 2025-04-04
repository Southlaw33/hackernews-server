import type { User } from "@prisma/client";

export type GetMeResult = {
  user: User;
};

export enum GetMeError {
  BAD_REQUEST,
  UNKNOWN,
}

export type GetUsersResult = {
  users: User[];
};

export enum GetUsersError {
  NO_USERS,
  UNKNOWN,
}
