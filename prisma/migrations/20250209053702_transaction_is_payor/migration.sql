/*
  Warnings:

  - You are about to drop the column `payorId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `isPayor` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_payorId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payorId",
ADD COLUMN     "isPayor" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
