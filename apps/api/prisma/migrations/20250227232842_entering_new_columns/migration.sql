/*
  Warnings:

  - The primary key for the `_DepartmentToEmployee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_DepartmentToJob` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_DepartmentToMetric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_JobToMetric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_DepartmentToEmployee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_DepartmentToJob` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_DepartmentToMetric` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_JobToMetric` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_DepartmentToEmployee" DROP CONSTRAINT "_DepartmentToEmployee_AB_pkey";

-- AlterTable
ALTER TABLE "_DepartmentToJob" DROP CONSTRAINT "_DepartmentToJob_AB_pkey";

-- AlterTable
ALTER TABLE "_DepartmentToMetric" DROP CONSTRAINT "_DepartmentToMetric_AB_pkey";

-- AlterTable
ALTER TABLE "_JobToMetric" DROP CONSTRAINT "_JobToMetric_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToEmployee_AB_unique" ON "_DepartmentToEmployee"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToJob_AB_unique" ON "_DepartmentToJob"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToMetric_AB_unique" ON "_DepartmentToMetric"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToMetric_AB_unique" ON "_JobToMetric"("A", "B");
