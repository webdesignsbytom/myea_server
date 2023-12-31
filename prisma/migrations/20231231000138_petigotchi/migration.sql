-- CreateTable
CREATE TABLE "Petigotchi" (
    "id" TEXT NOT NULL,
    "petType" TEXT NOT NULL DEFAULT 'Cat',
    "petName" TEXT NOT NULL,
    "petAge" INTEGER NOT NULL DEFAULT 0,
    "petHealth" INTEGER NOT NULL DEFAULT 100,
    "petStrength" INTEGER NOT NULL DEFAULT 1,
    "petIntelligence" INTEGER NOT NULL DEFAULT 1,
    "petStatus" TEXT NOT NULL DEFAULT 'Healthy Newborn',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Petigotchi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Petigotchi_userId_key" ON "Petigotchi"("userId");

-- AddForeignKey
ALTER TABLE "Petigotchi" ADD CONSTRAINT "Petigotchi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
