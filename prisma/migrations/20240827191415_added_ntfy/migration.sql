-- CreateTable
CREATE TABLE "Ntfy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topic" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "minRent" REAL,
    "maxRent" REAL,
    "minRooms" REAL,
    "maxRooms" REAL,
    "minSize" REAL,
    "maxSize" REAL,
    "landlords" TEXT,
    "boroughs" TEXT
);
