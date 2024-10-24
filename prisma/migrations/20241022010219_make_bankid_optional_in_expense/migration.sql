-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_bank_id_fkey";

-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "bank_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
