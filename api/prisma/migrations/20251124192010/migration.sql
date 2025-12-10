/*
  Warnings:

  - You are about to drop the column `invitationCode` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_invitationCode_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "invitationCode";

-- CreateTable
CREATE TABLE "RecyclesMade" (
    "id" VARCHAR(36) NOT NULL,
    "userId" TEXT NOT NULL,
    "doneDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecyclesMade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecyclesMade" ADD CONSTRAINT "RecyclesMade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
