/*
  Warnings:

  - Added the required column `groupId` to the `Owe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owe" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Owe" ADD CONSTRAINT "Owe_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
