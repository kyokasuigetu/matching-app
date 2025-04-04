-- CreateTable
CREATE TABLE "MajorCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "MajorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "majorCategoryId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_majorCategoryId_fkey" FOREIGN KEY ("majorCategoryId") REFERENCES "MajorCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
