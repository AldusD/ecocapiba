/*
  Warnings:

  - Added the required column `capibas` to the `InvitationLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xp` to the `InvitationLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvitationLog" ADD COLUMN     "capibas" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "capibas" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0;
