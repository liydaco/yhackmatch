-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "linkedin" TEXT,
    "dish" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "matchRecordId" TEXT
);

-- CreateTable
CREATE TABLE "MatchRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "similarityScore" REAL NOT NULL,
    "menu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    CONSTRAINT "MatchRecord_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchRecord_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_matchRecordId_idx" ON "User"("matchRecordId");

-- CreateIndex
CREATE INDEX "MatchRecord_id_idx" ON "MatchRecord"("id");

-- CreateIndex
CREATE INDEX "MatchRecord_user1Id_idx" ON "MatchRecord"("user1Id");

-- CreateIndex
CREATE INDEX "MatchRecord_user2Id_idx" ON "MatchRecord"("user2Id");
