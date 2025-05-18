"use client";
import { DataTable } from "@/repo/ui/components/ui/data-table";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { fetchDepartments } from "@/fetch/department/fetchDepartments";
import { Department } from "@/types/department.type";
import { columnsDataTableDepartment } from "../columns/department-list";

export function DepartmentTable() {
  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setResfresh] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchDepartments();
      setData(data);
      setIsLoading(false);
    };
    getData();
  }, [refresh]);
  return (
    !isLoading ? (
      <div className="z-0 w-screen relative">
        <div className="w-full">
          <DataTable
            data={data}
            columns={columnsDataTableDepartment}
            filterItem="name"
          />
        </div>
        <button
          onClick={() => setResfresh((e) => !e)}
          className="z-20 top-4 right-3 absolute border p-2 rounded-sm shadow hover:shadow-slate-500"
        >
          <RefreshCcw />
        </button>
      </div>
    ) : <p>Carregando</p>
  );
}
