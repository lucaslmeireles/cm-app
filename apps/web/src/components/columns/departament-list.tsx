import { ColumnDef } from "@tanstack/react-table";
import { Department } from "@/types/department.type";

export const columnsDataTableDepartment: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "_count.employes",
    header: "Employes",
  },
  {
    accessorKey: "_count.courses",
    header: "Courses",
  },
  {
    accessorKey: "_count.managers",
    header: "Managers",
  },
  {
    accessorKey: "_count.jobs",
    header: "Jobs",
  },
  {
    accessorKey: "_count.metrics",
    header: "Metrics",
  },
];
