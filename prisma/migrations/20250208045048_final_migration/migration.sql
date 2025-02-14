/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "username";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "email" VARCHAR NOT NULL;
