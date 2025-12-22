"use client";

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
import { Job } from "@/types/job.type";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";

export function DeleteJob({
  job,
}: {
  job: Job;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [status, setStatus] = useState("idle");
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
        setStatus("loading")
        const data = await deleteJob(job.id);
        setStatus("success")
        setOpen(false);
        if (data.statusCode !== 201) {
            toast({
              title: "Something went wrong",
              description: data.message,
              variant: "destructive",
            });
        }
        mutate(job.id)
        toast({
            title: "Cargo apagado",
            description: <>
              <p>
                {data.name}
              </p>
            </>,
          });
        router.back()
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
      <p>Are you sure you want to delete {job.name}?</p>
      </DialogTitle>
        <LoadingButton  status={status} variant="destructive" className="w-full" onClick={() => handleDelete()}>
          Yes
        </LoadingButton>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
