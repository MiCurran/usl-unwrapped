/*
  Warnings:

  - Added the required column `active` to the `UslTeams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UslTeams" ADD COLUMN     "active" BOOLEAN NOT NULL;
