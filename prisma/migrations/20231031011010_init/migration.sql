/*
  Warnings:

  - The primary key for the `VideoComment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VideoTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `History` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Playlist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VideoComment" (
    "commentId" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "datePosted" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    CONSTRAINT "VideoComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VideoComment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("videoId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoComment" ("comment", "commentId", "datePosted", "userId", "videoId") SELECT "comment", "commentId", "datePosted", "userId", "videoId" FROM "VideoComment";
DROP TABLE "VideoComment";
ALTER TABLE "new_VideoComment" RENAME TO "VideoComment";
CREATE TABLE "new_VideoTag" (
    "tagId" TEXT NOT NULL PRIMARY KEY,
    "tagName" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    CONSTRAINT "VideoTag_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("videoId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VideoTag" ("tagId", "tagName", "videoId") SELECT "tagId", "tagName", "videoId" FROM "VideoTag";
DROP TABLE "VideoTag";
ALTER TABLE "new_VideoTag" RENAME TO "VideoTag";
CREATE TABLE "new_Video" (
    "videoId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "viewsCount" INTEGER NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Video" ("description", "publishDate", "title", "videoId", "viewsCount") SELECT "description", "publishDate", "title", "videoId", "viewsCount" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE TABLE "new_History" (
    "historyId" TEXT NOT NULL PRIMARY KEY,
    "viewDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video" ("videoId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("historyId", "userId", "videoId", "viewDate") SELECT "historyId", "userId", "videoId", "viewDate" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
CREATE TABLE "new__PlaylistToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PlaylistToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist" ("playlistId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlaylistToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video" ("videoId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PlaylistToVideo" ("A", "B") SELECT "A", "B" FROM "_PlaylistToVideo";
DROP TABLE "_PlaylistToVideo";
ALTER TABLE "new__PlaylistToVideo" RENAME TO "_PlaylistToVideo";
CREATE UNIQUE INDEX "_PlaylistToVideo_AB_unique" ON "_PlaylistToVideo"("A", "B");
CREATE INDEX "_PlaylistToVideo_B_index" ON "_PlaylistToVideo"("B");
CREATE TABLE "new_Playlist" (
    "playlistId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Playlist" ("description", "name", "playlistId", "userId") SELECT "description", "name", "playlistId", "userId" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
