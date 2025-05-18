"use client";

import { deleteAbsenceById } from "@/fetch/absence/deleteAbsenceById";
import { deleteJob } from "@/fetch/job/deleteJob";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/repo/ui/components/ui/dialog";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { Absence } from "@/types/absence.type";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function DeleteAbsence({
  absence,
  mutate
}: {
  absence: Absence
  mutate: any
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [status, setStatus] = useState("idle");
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
        setStatus("loading")
        const data = await deleteAbsenceById(absence.id);
        setStatus("success")
        setOpen(false);
        if (data.statusCode !== 201) {
            toast({
              title: "Something went wrong",
              description: data.message,
              variant: "destructive",
            });
        }
        mutate()
        toast({
            title: "Falta apagado",
            description: <>
              <p>
                {data.name}
              </p>
            </>,
          });
        return data;
    } catch (e) {
        setStatus("error")
        console.log(e)
        toast({
            title: "Something went wrong",
            description: e.message,
            variant: "destructive",
          });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost"><Trash color="red"/></Button>
      </DialogTrigger>
      <DialogContent>
      <DialogTitle>
      <p>Are you sure you want to delete?</p>
      </DialogTitle>
        <LoadingButton  status={status} variant="destructive" className="w-full" onClick={() => handleDelete()}>
          Yes
        </LoadingButton>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
