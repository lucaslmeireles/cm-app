"use client";
import { deleteEmployee } from "@/fetch/employee/deleteEmployee";
import { fetchIsManager } from "@/fetch/managers/isManager";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/repo/ui/components/ui/dialog";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { Employee } from "@/types/employee.type";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DeleteEmployee({ employee }: { employee: Employee }) {
  const [status, setStatus] = useState("idle");
  const [isManager, setIsManager] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const isManager = await fetchIsManager(employee.id);
      setIsManager(isManager);
    };
    fetchData();
  }, []);

  console.log(isManager);
  const handleDelete = async () => {
    setStatus("loading");
    try {
      const data = await deleteEmployee(employee.id);
      setStatus("success");
      router.push("/employees");
    } catch (e) {
      setStatus("error");
    }
  };
  const handleDeleteManager = async () => {
    setStatus("loading");
    try {
      const data = await deleteManager(isManager.data.user_id);
      setStatus("success");
      router.push("/employees");
    } catch (e) {
      setStatus("error");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost"><Trash color="#c91111"/></Button>
      </DialogTrigger>
      <DialogContent>
        <p>Are you sure you want to delete {employee.name}?</p>
        {isManager ? (
          <>
            <LoadingButton
              status={status}
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleDelete()}
            >
              Delete only manager
            </LoadingButton>
            <LoadingButton
              status={status}
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => handleDelete()}
            >
              Delete employee and manager
            </LoadingButton>
          </>
        ) : (
          <LoadingButton
            status={status}
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => handleDelete()}
          >
            Yes
          </LoadingButton>
        )}
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
