-- CreateEnum
CREATE TYPE "EmployeeCount" AS ENUM ('1～9人', '10～29人', '30～49人', '50～99人', '100～199人', '200～299人', '300～499人', '500～999人', '1000～1999人', '2000人以上');

-- CreateEnum
CREATE TYPE "LinkLabel" AS ENUM ('corporateSite', 'facebook', 'x', 'instagram', 'youTube', 'linkedIn', 'others');

-- CreateTable
CREATE TABLE "Profile" (
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "contactName" TEXT,
    "iconUrl" TEXT,
    "backgroundUrl" TEXT,
    "companyHistory" VARCHAR(1000),
    "businessDescription" TEXT,
    "message" TEXT,
    "employeeCount" "EmployeeCount",
    "establishmentYear" INTEGER,
    "capital" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ProfileLink" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "label" "LinkLabel" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ProfileLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileCategory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "ProfileCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileLink" ADD CONSTRAINT "ProfileLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileCategory" ADD CONSTRAINT "ProfileCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
