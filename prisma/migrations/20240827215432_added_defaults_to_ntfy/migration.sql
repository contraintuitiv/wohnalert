-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ntfy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL DEFAULT 'ntfy.sh',
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
INSERT INTO "new_Ntfy" ("boroughs", "createdAt", "host", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize", "topic") SELECT "boroughs", "createdAt", coalesce("host", 'ntfy.sh') AS "host", "id", "landlords", "maxRent", "maxRooms", "maxSize", "minRent", "minRooms", "minSize", "topic" FROM "Ntfy";
DROP TABLE "Ntfy";
ALTER TABLE "new_Ntfy" RENAME TO "Ntfy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
