/*
  Warnings:

  - You are about to drop the column `hover` on the `Record` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
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
INSERT INTO "new_Record" ("borough", "createdAt", "description", "house_number", "id", "landlord", "lat", "long", "neighbourhood", "properties", "rent", "road", "rooms", "size", "suburb", "url", "wbs") SELECT "borough", "createdAt", "description", "house_number", "id", "landlord", "lat", "long", "neighbourhood", "properties", "rent", "road", "rooms", "size", "suburb", "url", "wbs" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
