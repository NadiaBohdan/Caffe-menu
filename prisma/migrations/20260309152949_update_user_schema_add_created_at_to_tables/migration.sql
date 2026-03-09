/*
  Warnings:

  - You are about to alter the column `percent_discount` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Int`.
  - You are about to drop the column `full_name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id,product_id]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `added_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `favourite` ADD COLUMN `added_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `product` MODIFY `percent_discount` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `full_name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `order_created_at_idx` ON `order`(`created_at`);

-- CreateIndex
CREATE INDEX `order_status_idx` ON `order`(`status`);

-- CreateIndex
CREATE UNIQUE INDEX `order_items_order_id_product_id_key` ON `order_items`(`order_id`, `product_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `fk_order_user` TO `order_user_id_idx`;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `fk_product_category` TO `product_category_id_idx`;
