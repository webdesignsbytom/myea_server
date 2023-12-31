/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profileImage",
ADD COLUMN     "profileImageUrl" TEXT DEFAULT 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png';
