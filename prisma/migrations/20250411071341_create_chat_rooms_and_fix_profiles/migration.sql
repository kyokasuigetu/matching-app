/*
  Warnings:

  - You are about to drop the `MajorCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChatRoomType" AS ENUM ('direct', 'group');

-- DropForeignKey
ALTER TABLE "ProfileCategory" DROP CONSTRAINT "ProfileCategory_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileCategory" DROP CONSTRAINT "ProfileCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileLink" DROP CONSTRAINT "ProfileLink_profileId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_majorCategoryId_fkey";

-- DropTable
DROP TABLE "MajorCategory";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "ProfileCategory";

-- DropTable
DROP TABLE "ProfileLink";

-- DropTable
DROP TABLE "SubCategory";

-- CreateTable
CREATE TABLE "majorCategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "majorCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCategories" (
    "id" SERIAL NOT NULL,
    "majorCategoryId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "subCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "profileLinks" (
    "id" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "label" "LinkLabel" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "profileLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileCategories" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "subCategoryId" INTEGER NOT NULL,

    CONSTRAINT "profileCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatRooms" (
    "id" TEXT NOT NULL,
    "type" "ChatRoomType" NOT NULL,
    "title" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatRoomParticipants" (
    "id" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastReadAt" TIMESTAMP(3) NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatRoomParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatMessages" (
    "id" SERIAL NOT NULL,
    "roomId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_majorCategoryId_fkey" FOREIGN KEY ("majorCategoryId") REFERENCES "majorCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileLinks" ADD CONSTRAINT "profileLinks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileCategories" ADD CONSTRAINT "profileCategories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileCategories" ADD CONSTRAINT "profileCategories_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoomParticipants" ADD CONSTRAINT "chatRoomParticipants_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chatRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoomParticipants" ADD CONSTRAINT "chatRoomParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatMessages" ADD CONSTRAINT "chatMessages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatMessages" ADD CONSTRAINT "chatMessages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chatRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
