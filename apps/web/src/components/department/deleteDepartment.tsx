"use client";

import { deleteDepartment } from "@/fetch/department/deleteDepartment";
import { deleteEmployee } from "@/fetch/employee/deleteEmployee";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/repo/ui/components/ui/dialog";
import { Department } from "@/types/department.type";
import { Trash } from "lucide-react";
import { useState } from "react";

export function DeleteDepartment({
  department,
}: {
  department: Department;
}) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const data = await deleteDepartment(department.id);
    setOpen(false);
    console.log(data);
    return data;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <Button variant="ghost">
        <Trash height={18}  color="red"/>
      </Button>
      </DialogTrigger>
      <DialogContent>
      <DialogTitle>
      <p>Are you sure you want to delete {department.name}?</p>
      </DialogTitle>
        <p>Every employee in this department will be DELETED?</p>
        <Button variant="destructive" onClick={() => handleDelete()}>
          Yes
        </Button>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
