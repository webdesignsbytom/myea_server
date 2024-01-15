-- CreateTable
CREATE TABLE "EcoEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EcoEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EcoEvent" ADD CONSTRAINT "EcoEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
