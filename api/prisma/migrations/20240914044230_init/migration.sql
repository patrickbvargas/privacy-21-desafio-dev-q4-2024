/*
  Warnings:

  - You are about to alter the column `delay_fee_per_day` on the `loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "loans" ALTER COLUMN "delay_fee_per_day" SET DATA TYPE DOUBLE PRECISION;
