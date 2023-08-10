/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "clockIn" TEXT,
    "clockOut" TEXT,
    "date" TEXT,
    "status" TEXT,
    "day" TEXT,
    "email" TEXT NOT NULL,
    "month" TEXT,
    "rest" TEXT,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave_balance" (
    "user_email" TEXT NOT NULL,
    "paid_leave" INTEGER NOT NULL,
    "harfday_leave" INTEGER NOT NULL,
    "special_leave" INTEGER NOT NULL,

    CONSTRAINT "leave_balance_pkey" PRIMARY KEY ("user_email")
);

-- CreateTable
CREATE TABLE "approval_status" (
    "user_email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "gm" BOOLEAN NOT NULL,
    "delete" BOOLEAN NOT NULL,

    CONSTRAINT "approval_status_pkey" PRIMARY KEY ("user_email")
);

-- CreateTable
CREATE TABLE "department" (
    "Id" INTEGER NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "role" (
    "Id" INTEGER NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "attendance_types" (
    "Id" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,

    CONSTRAINT "attendance_types_pkey" PRIMARY KEY ("Id")
);
