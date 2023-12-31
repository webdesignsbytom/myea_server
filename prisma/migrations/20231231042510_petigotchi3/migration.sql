/*
  Warnings:

  - You are about to drop the column `dob` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "dob",
DROP COLUMN "isPrivate",
ADD COLUMN     "isPrivateProfile" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
