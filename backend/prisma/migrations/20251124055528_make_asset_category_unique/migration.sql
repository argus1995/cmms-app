/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `asset_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "asset_categories_name_key" ON "asset_categories"("name");
