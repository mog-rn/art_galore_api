/*
  Warnings:

  - You are about to drop the column `confirmationToken` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_confirmationToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "confirmationToken";
