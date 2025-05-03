/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Account_userId_idx";

-- DropIndex
DROP INDEX "Session_userId_idx";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Verification" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_userId_key" ON "Like"("postId", "userId");
