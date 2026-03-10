/*
  Warnings:

  - A unique constraint covering the columns `[description,date,deleted_at]` on the table `expense` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "expense_description_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "expense_description_date_deleted_at_key" ON "expense"("description", "date", "deleted_at");
