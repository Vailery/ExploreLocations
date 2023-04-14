/*
  Warnings:

  - Changed the type of `Type` on the `Airports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeOfAirport" AS ENUM ('domestic', 'local', 'international');

-- AlterTable
ALTER TABLE "Airports" DROP COLUMN "Type",
ADD COLUMN     "Type" "TypeOfAirport" NOT NULL;

-- DropEnum
DROP TYPE "Type_Of_Airport";
