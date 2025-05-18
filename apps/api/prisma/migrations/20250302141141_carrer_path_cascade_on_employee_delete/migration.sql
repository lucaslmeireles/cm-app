-- DropForeignKey
ALTER TABLE "CareerPath" DROP CONSTRAINT "CareerPath_employee_id_fkey";

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
ALTER TABLE "CareerPath" ADD CONSTRAINT "CareerPath_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
