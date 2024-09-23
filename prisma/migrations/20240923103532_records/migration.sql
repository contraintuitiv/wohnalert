/*
  Warnings:

  - Added the required column `hover` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ntfy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL DEFAULT 'ntfy.freizeitstress.org',
    "topic" TEXT,
    "minRent" REAL DEFAULT 1,
    "maxRent" REAL DEFAULT 99999999999,
    "minRooms" REAL DEFAULT 1,
    "maxRooms" REAL DEFAULT 99999999999,
    "minSize" REAL DEFAULT 1,
    "maxSize" REAL DEFAULT 99999999999,
    "landlords" TEXT DEFAULT '[]',
    "boroughs" TEXT DEFAULT '[]'
);
INSERT INTO "new_Ntfy" ("boroughs", "createdAt", "host", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize", "topic") SELECT "boroughs", "createdAt", "host", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize", "topic" FROM "Ntfy";
DROP TABLE "Ntfy";
ALTER TABLE "new_Ntfy" RENAME TO "Ntfy";
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
    "properties" TEXT NOT NULL,
    "hover" BOOLEAN NOT NULL
);
INSERT INTO "new_Record" ("borough", "createdAt", "description", "house_number", "id", "landlord", "lat", "long", "neighbourhood", "properties", "rent", "road", "rooms", "size", "suburb", "url", "wbs") SELECT "borough", "createdAt", "description", "house_number", "id", "landlord", "lat", "long", "neighbourhood", "properties", "rent", "road", "rooms", "size", "suburb", "url", "wbs" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
