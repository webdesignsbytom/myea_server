-- AlterTable
ALTER TABLE "LotteryDraw" ADD COLUMN     "ticketsAreOnSale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "winnerFound" BOOLEAN NOT NULL DEFAULT false;
