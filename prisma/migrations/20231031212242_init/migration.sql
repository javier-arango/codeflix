/*
  Warnings:

  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "videoId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "viewsCount" INTEGER NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Video" ("description", "publishDate", "title", "videoId", "viewsCount") SELECT "description", "publishDate", "title", "videoId", "viewsCount" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
