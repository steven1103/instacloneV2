-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;