-- CreateTable
CREATE TABLE "Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "landlord" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "long" REAL NOT NULL,
    "house_number" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "neighbourhood" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "borough" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "rooms" REAL NOT NULL,
    "rent" REAL NOT NULL,
    "wbs" BOOLEAN NOT NULL,
    "properties" TEXT NOT NULL
);
