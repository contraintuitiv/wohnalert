/*
  Warnings:

  - You are about to drop the column `url` on the `Ntfy` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ntfy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "host" TEXT,
    "minRent" REAL,
    "maxRent" REAL,
    "minRooms" REAL,
    "maxRooms" REAL,
    "minSize" REAL,
    "maxSize" REAL,
    "landlords" TEXT,
    "boroughs" TEXT
);
INSERT INTO "new_Ntfy" ("boroughs", "createdAt", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize") SELECT "boroughs", "createdAt", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize" FROM "Ntfy";
DROP TABLE "Ntfy";
ALTER TABLE "new_Ntfy" RENAME TO "Ntfy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
