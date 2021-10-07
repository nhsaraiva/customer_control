/*
  Warnings:

  - Added the required column `payment_date` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payment_date" TEXT NOT NULL;
