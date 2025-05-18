/*
  Warnings:

  - You are about to drop the column `address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `address_enc` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ResourceType" ADD VALUE 'CAREER_PATH';
ALTER TYPE "ResourceType" ADD VALUE 'CAREER_STEP';
ALTER TYPE "ResourceType" ADD VALUE 'DISC';
ALTER TYPE "ResourceType" ADD VALUE 'USER';
ALTER TYPE "ResourceType" ADD VALUE 'ROLE';
ALTER TYPE "ResourceType" ADD VALUE 'ORGANIZATION';
ALTER TYPE "ResourceType" ADD VALUE 'ORGANIZATION_SETTINGS';

-- DropForeignKey
ALTER TABLE "CareerStep" DROP CONSTRAINT "CareerStep_career_path_id_fkey";

-- DropIndex
DROP INDEX "Employee_email_idx";

-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "address",
DROP COLUMN "address_enc",
DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "address_encrypted" TEXT;

-- AlterTable
ALTER TABLE "_DepartmentToEmployee" ADD CONSTRAINT "_DepartmentToEmployee_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DepartmentToEmployee_AB_unique";

-- AlterTable
ALTER TABLE "_DepartmentToJob" ADD CONSTRAINT "_DepartmentToJob_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DepartmentToJob_AB_unique";

-- AlterTable
ALTER TABLE "_DepartmentToMetric" ADD CONSTRAINT "_DepartmentToMetric_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DepartmentToMetric_AB_unique";

-- AlterTable
ALTER TABLE "_JobToMetric" ADD CONSTRAINT "_JobToMetric_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_JobToMetric_AB_unique";

-- AddForeignKey
ALTER TABLE "CareerStep" ADD CONSTRAINT "CareerStep_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
