/*
  Warnings:

  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_productId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
