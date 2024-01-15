/*
  Warnings:

  - Added the required column `imageUrl` to the `EcoEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EcoEvent" ADD COLUMN     "imageUrl" TEXT NOT NULL;
