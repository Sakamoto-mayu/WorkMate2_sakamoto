/*
  Warnings:

  - You are about to drop the column `status` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `attendance` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "status",
ADD COLUMN     "attendance" BOOLEAN NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
