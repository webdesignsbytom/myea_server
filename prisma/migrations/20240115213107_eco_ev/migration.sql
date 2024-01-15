/*
  Warnings:

  - Added the required column `eventDate` to the `EcoEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventInfo` to the `EcoEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLocation` to the `EcoEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTitle` to the `EcoEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EcoEvent" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventInfo" TEXT NOT NULL,
ADD COLUMN     "eventLocation" TEXT NOT NULL,
ADD COLUMN     "eventTitle" TEXT NOT NULL;
