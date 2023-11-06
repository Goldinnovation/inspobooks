-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "sid" TEXT NOT NULL,
    "sess" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_sid_key" ON "session"("sid");
