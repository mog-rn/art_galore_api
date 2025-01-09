-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "arts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
