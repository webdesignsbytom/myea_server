-- CreateTable
CREATE TABLE "Achievements" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "achievementsGained" INTEGER[] DEFAULT ARRAY[0]::INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetigotchiHighscores" (
    "id" TEXT NOT NULL,
    "highscore1" INTEGER NOT NULL DEFAULT 0,
    "highscore1Name" TEXT NOT NULL DEFAULT '',
    "highscore2" INTEGER NOT NULL DEFAULT 0,
    "highscore2Name" TEXT NOT NULL DEFAULT '',
    "highscore3" INTEGER NOT NULL DEFAULT 0,
    "highscore3Name" TEXT NOT NULL DEFAULT '',
    "highscore4" INTEGER NOT NULL DEFAULT 0,
    "highscore4Name" TEXT NOT NULL DEFAULT '',
    "highscore5" INTEGER NOT NULL DEFAULT 0,
    "highscore5Name" TEXT NOT NULL DEFAULT '',
    "highscore6" INTEGER NOT NULL DEFAULT 0,
    "highscore6Name" TEXT NOT NULL DEFAULT '',
    "highscore7" INTEGER NOT NULL DEFAULT 0,
    "highscore7Name" TEXT NOT NULL DEFAULT '',
    "highscore8" INTEGER NOT NULL DEFAULT 0,
    "highscore8Name" TEXT NOT NULL DEFAULT '',
    "highscore9" INTEGER NOT NULL DEFAULT 0,
    "highscore9Name" TEXT NOT NULL DEFAULT '',
    "highscore10" INTEGER NOT NULL DEFAULT 0,
    "highscore10Name" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PetigotchiHighscores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_profileId_key" ON "Achievements"("profileId");

-- AddForeignKey
ALTER TABLE "Achievements" ADD CONSTRAINT "Achievements_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
