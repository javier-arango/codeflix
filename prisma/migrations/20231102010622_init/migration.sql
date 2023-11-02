/*
  Warnings:

  - You are about to drop the column `publishAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `publishAt` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `publishedAt` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedAt` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "videoId" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("channelId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("categoryId", "channelId", "channelTitle", "commentsCount", "description", "likesCount", "thumbnailUrl", "title", "url", "videoId", "viewsCount") SELECT "categoryId", "channelId", "channelTitle", "commentsCount", "description", "likesCount", "thumbnailUrl", "title", "url", "videoId", "viewsCount" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE TABLE "new_Channel" (
    "channelId" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videosCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "subscribersCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Channel" ("channelId", "description", "subscribersCount", "thumbnailUrl", "title", "url", "videosCount", "viewsCount") SELECT "channelId", "description", "subscribersCount", "thumbnailUrl", "title", "url", "videosCount", "viewsCount" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
