-- AlterTable
ALTER TABLE "Petigotchi" ADD COLUMN     "petLevel" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasLivePetigotchi" BOOLEAN NOT NULL DEFAULT false;
