/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistToVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `publishDate` on the `Video` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelTitle` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentsCount` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishAt` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_userName_key";

-- DropIndex
DROP INDEX "_PlaylistToVideo_B_index";

-- DropIndex
DROP INDEX "_PlaylistToVideo_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "History";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Playlist";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoComment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VideoTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlaylistToVideo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Channel" (
    "channelId" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videosCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "publishAt" DATETIME NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "subscribersCount" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "videoId" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishAt" DATETIME NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL,
    "channelChannelId" TEXT,
    CONSTRAINT "Video_channelChannelId_fkey" FOREIGN KEY ("channelChannelId") REFERENCES "Channel" ("channelId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("description", "title", "url", "videoId", "viewsCount") SELECT "description", "title", "url", "videoId", "viewsCount" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
