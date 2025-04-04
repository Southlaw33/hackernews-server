/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `likeid` on the `Like` table. All the data in the column will be lost.
  - The required column `commentId` was added to the `Comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `likeId` was added to the `Like` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentId" TEXT NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "likeid",
ADD COLUMN     "likeId" TEXT NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("likeId");
