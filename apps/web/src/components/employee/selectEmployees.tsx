"use client";
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/repo/ui/components/ui/button";
import { fetchEmployeesByDep } from "@/fetch/employee/fetchEmployeesByDep";
import { useEffect, useState } from "react";
import { Employee } from "@/types/employee.type";
import { Input } from "@/repo/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/repo/ui/components/ui/table";
import useSelectedEmployees from "@/store/employee.store";
import { fetchEmployeesByManager } from "@/fetch/employee/fetchEmployeesByManager";
import { columnsDataTablePromote } from "../columns/employee-promote.def";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterItem: string;
}




export const SelectEmployees = ({ ids, filterItem, options }: { ids?: string[], filterItem: string, options: "dep" | "course"}) => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const setSelectedRows = useSelectedEmployees(
    (state) => state.setSelectedRows
  );
  useEffect(() => {
    const getData = async () => {
      const data = options == "dep" ? await fetchEmployeesByDep(ids) : await fetchEmployeesByManager();
      setData(data);
      setIsLoading(!isLoading);
      console.log(data);
    };
    getData();
  }, [ids, options]);

  // TODO ESTUDAR ESSA PARTE
  const table = useReactTable({
    data,
    columns: columnsDataTablePromote,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      columnFilters,
      rowSelection,
    },
  });
  const row = table.getSelectedRowModel().rows;
  useEffect(() => {
    setSelectedRows(
      table.getSelectedRowModel().flatRows.map((row) => row.original.id)
    );
  }, [setSelectedRows, table, row]);

  return (
    <div>
      <h4 className="text-base font-semibold">Employees</h4>
      <p>Select the employees for this supervisor.</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <div className="flex items-center py-4">
              <Input
                placeholder={`Filter by ${filterItem}`}
                value={
                  (table.getColumn(filterItem)?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn(filterItem)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
