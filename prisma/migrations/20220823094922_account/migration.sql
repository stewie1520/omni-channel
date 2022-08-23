/*
  Warnings:

  - You are about to drop the column `avartarUrl` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `avartarUrl` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "avartarUrl",
ADD COLUMN     "avatarUrl" TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "avartarUrl",
ADD COLUMN     "avatarUrl" TEXT;
