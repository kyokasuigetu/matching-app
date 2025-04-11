-- AddForeignKey
ALTER TABLE "ProfileCategory" ADD CONSTRAINT "ProfileCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
