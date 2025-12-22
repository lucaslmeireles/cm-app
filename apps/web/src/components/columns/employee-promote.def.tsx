import { Checkbox } from "@/repo/ui/components/ui/checkbox";
import { Employee } from "@/types/employee.type";
import { ColumnDef } from "@tanstack/react-table";

export const columnsDataTablePromote: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "job.name",
    header: "Job",
  },
  {
    accessorKey: "department.name",
    header: "Department",
    cell: ({ row }) => {
      return row.original.department.map((dep) => (
        <div key={dep.name}>
          <h4>{dep.name}</h4>
        </div>
      ));
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
