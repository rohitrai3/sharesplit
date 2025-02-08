/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Owe" DROP CONSTRAINT "Owe_fromMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Owe" DROP CONSTRAINT "Owe_toMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Pay" DROP CONSTRAINT "Pay_memberId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToMember" DROP CONSTRAINT "_GroupToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToMember" DROP CONSTRAINT "_GroupToMember_B_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "_GroupToMember";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserIsMemberOfGroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserIsMemberOfGroups_AB_unique" ON "_UserIsMemberOfGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_UserIsMemberOfGroups_B_index" ON "_UserIsMemberOfGroups"("B");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pay" ADD CONSTRAINT "Pay_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owe" ADD CONSTRAINT "Owe_fromMemberId_fkey" FOREIGN KEY ("fromMemberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owe" ADD CONSTRAINT "Owe_toMemberId_fkey" FOREIGN KEY ("toMemberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIsMemberOfGroups" ADD CONSTRAINT "_UserIsMemberOfGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIsMemberOfGroups" ADD CONSTRAINT "_UserIsMemberOfGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
