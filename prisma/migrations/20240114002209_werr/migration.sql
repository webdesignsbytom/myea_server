/*
  Warnings:

  - You are about to drop the column `isNewsletterRecipient` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "isNewsletterRecipient";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userRegisteredForNewsletter" SET DEFAULT false;
