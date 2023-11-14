-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToVideo_AB_unique" ON "_PlaylistToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToVideo_B_index" ON "_PlaylistToVideo"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToVideo" ADD CONSTRAINT "_PlaylistToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToVideo" ADD CONSTRAINT "_PlaylistToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("videoId") ON DELETE CASCADE ON UPDATE CASCADE;
