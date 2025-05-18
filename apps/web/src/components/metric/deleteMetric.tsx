"use client";
import { deleteMetricByID } from "@/fetch/metric/deleteMetricByd";
import { Button } from "@/repo/ui/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/repo/ui/components/ui/dialog";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { Metric } from "@/types/metric.type";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteMetric({ metric, mutate }: { metric: Metric, mutate: any }) {
  const [status, setStatus] = useState("idle");
  const router = useRouter();
  
  const handleDelete = async () => {
    setStatus("loading");
    try {
      const data = await deleteMetricByID(metric.id);
      setStatus("success");
      mutate()
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
        <p>Are you sure you want to delete {metric.name}?</p>
     <LoadingButton
        status={status}
        className="w-full bg-red-600 hover:bg-red-700"
        onClick={() => handleDelete()}
      >
        Yes
      </LoadingButton>
        <Button variant="ghost">No</Button>
      </DialogContent>
    </Dialog>
  );
}
