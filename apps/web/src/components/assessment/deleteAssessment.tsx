"use client";

import { deleteAssessment } from "@/fetch/assessment/deleteAssesment";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/repo/ui/components/ui/dialog";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { Assessment } from "@/types/assesement.type";
import { Trash } from "lucide-react";
import { useState } from "react";
export function DeleteAssessment({ assesement }: { assesement: Assessment }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const handleDelete = async () => {
    setStatus("loading");
    try {
      const data = await deleteAssessment(assesement.id);
      setStatus("success");
      setOpen(false);
      return data;
    } catch (error) {
      setStatus("error");
      setOpen(false);
    }
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
        <LoadingButton
          variant="destructive"
          status={status}
          onClick={() => handleDelete()}
          className="w-full"
        >
          Yes
        </LoadingButton>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
