-- CreateTable
CREATE TABLE "InvitationLog" (
    "id" SERIAL NOT NULL,
    "inviterid" INTEGER NOT NULL,
    "invitedId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvitationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvitationLog_invitedId_inviterid_key" ON "InvitationLog"("invitedId", "inviterid");

-- AddForeignKey
ALTER TABLE "InvitationLog" ADD CONSTRAINT "InvitationLog_inviterid_fkey" FOREIGN KEY ("inviterid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationLog" ADD CONSTRAINT "InvitationLog_invitedId_fkey" FOREIGN KEY ("invitedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
