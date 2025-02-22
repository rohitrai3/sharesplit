/*
  Warnings:

  - You are about to drop the column `userId` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payorId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "userId",
ADD COLUMN     "createdByUserId" INTEGER NOT NULL,
ADD COLUMN     "payorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payorId_fkey" FOREIGN KEY ("payorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
