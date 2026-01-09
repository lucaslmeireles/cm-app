-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('Bachelor', 'Master', 'MBA', 'Doctorate', 'Technical', 'Specialization', 'Postgraduate', 'Extension', 'Training', 'Other');

-- CreateEnum
CREATE TYPE "EvaluationStatus" AS ENUM ('DRAFT', 'PENDING', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('MONTHLY', 'HOURLY', 'COMMISSION');

-- CreateEnum
CREATE TYPE "AbsenceType" AS ENUM ('VACATION', 'SICK_LEAVE', 'UNPAID_LEAVE', 'OTHER');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('EMPLOYEE', 'EVALUATION', 'ABSENCE', 'POSITION', 'SALARY', 'DEPARTMENT', 'JOB', 'METRIC', 'COURSE', 'CAREER_PATH', 'CAREER_STEP', 'USER', 'ROLE', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "CareerStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD');

-- CreateTable
CREATE TABLE "AuditableEntity" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "resource_type" "ResourceType" NOT NULL,
    "resource_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changes" JSONB,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "AuditableEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "role_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "institution" TEXT,
    "degree" TEXT,
    "field" TEXT,
    "grade" TEXT,
    "description" TEXT,
    "certificate" TEXT,
    "certificate_url" TEXT,
    "type" "CourseType" NOT NULL,
    "employee_id" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "profile_pic" TEXT,
    "tenant_id" INTEGER NOT NULL,
    "phone_encrypted" TEXT,
    "email_encrypted" TEXT,
    "address_encrypted" TEXT,
    "manager_id" TEXT,
    "department_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerPath" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target_date" TIMESTAMP(3),
    "status" "CareerStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerStep" (
    "id" TEXT NOT NULL,
    "career_path_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "order_number" INTEGER NOT NULL,
    "achieved" BOOLEAN NOT NULL DEFAULT false,
    "achieved_date" TIMESTAMP(3),
    "requirements" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "controls" JSONB,
    "organizationId" INTEGER,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tenant_id" INTEGER,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "evaluator_id" TEXT NOT NULL,
    "status" "EvaluationStatus" NOT NULL DEFAULT 'DRAFT',
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "evaluation_id" TEXT NOT NULL,
    "metric_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "type" "AbsenceType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "justification" TEXT,
    "documents" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "requirements" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "max_slots" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "type" "SalaryType" NOT NULL DEFAULT 'MONTHLY',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "approved_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuditableEntity_resource_type_resource_id_idx" ON "AuditableEntity"("resource_type", "resource_id");

-- CreateIndex
CREATE INDEX "AuditableEntity_tenant_id_idx" ON "AuditableEntity"("tenant_id");

-- CreateIndex
CREATE INDEX "AuditableEntity_created_at_idx" ON "AuditableEntity"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_employee_id_key" ON "User"("employee_id");

-- CreateIndex
CREATE INDEX "User_tenant_id_idx" ON "User"("tenant_id");

-- CreateIndex
CREATE INDEX "User_role_id_idx" ON "User"("role_id");

-- CreateIndex
CREATE INDEX "Department_tenant_id_idx" ON "Department"("tenant_id");

-- CreateIndex
CREATE INDEX "Education_employee_id_idx" ON "Education"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_register_key" ON "Employee"("register");

-- CreateIndex
CREATE INDEX "Employee_tenant_id_idx" ON "Employee"("tenant_id");

-- CreateIndex
CREATE INDEX "Employee_manager_id_idx" ON "Employee"("manager_id");

-- CreateIndex
CREATE INDEX "Employee_register_idx" ON "Employee"("register");

-- CreateIndex
CREATE INDEX "CareerPath_employee_id_idx" ON "CareerPath"("employee_id");

-- CreateIndex
CREATE INDEX "CareerStep_career_path_id_idx" ON "CareerStep"("career_path_id");

-- CreateIndex
CREATE INDEX "CareerStep_position_id_idx" ON "CareerStep"("position_id");

-- CreateIndex
CREATE UNIQUE INDEX "CareerStep_career_path_id_order_number_key" ON "CareerStep"("career_path_id", "order_number");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_organizationId_idx" ON "Role"("organizationId");

-- CreateIndex
CREATE INDEX "Metric_tenant_id_idx" ON "Metric"("tenant_id");

-- CreateIndex
CREATE INDEX "Evaluation_employee_id_period_start_period_end_idx" ON "Evaluation"("employee_id", "period_start", "period_end");

-- CreateIndex
CREATE INDEX "Evaluation_evaluator_id_idx" ON "Evaluation"("evaluator_id");

-- CreateIndex
CREATE INDEX "Absence_employee_id_start_date_end_date_idx" ON "Absence"("employee_id", "start_date", "end_date");

-- CreateIndex
CREATE INDEX "Absence_approver_id_idx" ON "Absence"("approver_id");

-- CreateIndex
CREATE INDEX "Position_department_id_idx" ON "Position"("department_id");

-- CreateIndex
CREATE INDEX "Salary_position_id_start_date_idx" ON "Salary"("position_id", "start_date");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerPath" ADD CONSTRAINT "CareerPath_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerStep" ADD CONSTRAINT "CareerStep_career_path_id_fkey" FOREIGN KEY ("career_path_id") REFERENCES "CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerStep" ADD CONSTRAINT "CareerStep_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "Evaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
