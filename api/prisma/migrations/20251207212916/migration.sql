/*
  Warnings:

  - You are about to drop the column `inviterid` on the `InvitationLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invitedId,inviterId]` on the table `InvitationLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviterId` to the `InvitationLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvitationLog" DROP CONSTRAINT "InvitationLog_inviterid_fkey";

-- DropIndex
DROP INDEX "InvitationLog_invitedId_inviterid_key";

-- AlterTable
ALTER TABLE "InvitationLog" DROP COLUMN "inviterid",
ADD COLUMN     "inviterId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InvitationLog_invitedId_inviterId_key" ON "InvitationLog"("invitedId", "inviterId");

-- AddForeignKey
ALTER TABLE "InvitationLog" ADD CONSTRAINT "InvitationLog_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
