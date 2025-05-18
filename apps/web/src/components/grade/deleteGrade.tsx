"use client";

import { deleteAssessment } from "@/fetch/assessment/deleteAssessment";
import { deleteDepartment } from "@/fetch/department/deleteDepartment";
import { deleteEmployee } from "@/fetch/employee/deleteEmployee";
import { deleteGrade } from "@/fetch/grade/deleteGrade";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/repo/ui/components/ui/dialog";
import useGrade from "@/store/grade.store";
import useStore from "@/store/metric.store";
import { Assessment } from "@/types/assesement.type";
import { Grade } from "@/types/grade.type";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";
export function DeleteGrade({grade, id }: { grade: Grade ,  id:string}) {
  const [open, setOpen] = useState(false);
  const removeGrade = useGrade((state) => state.addGrade);
  const removeMetric = useStore((state) => state.removeMetric);
  console.log(grade, id)
  const handleDelete = async () => {
    const data = await deleteGrade(grade.id);
    setOpen(false);
    console.log(grade, id)
    console.log(data);
    removeGrade(grade.metric)
    removeMetric(grade.metric)
    return data;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash height={14} color="red" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <p>Are you sure you want to delete?</p>
        </DialogTitle>
        <Button variant="destructive" onClick={() => handleDelete()}>
          Yes
        </Button>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
