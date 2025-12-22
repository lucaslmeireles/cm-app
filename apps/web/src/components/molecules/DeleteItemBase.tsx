"use client";

import { Button } from "@/repo/ui/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/repo/ui/components/ui/dialog";
import { LoadingButton } from "@/repo/ui/components/ui/loading-button";
import { useToast } from "@/repo/ui/components/ui/use-toast";
import { Trash } from "lucide-react";
import React, { useState } from "react";

type DeleteDialogBaseProps<T> = {
    title?: string;
    description?: string | ((item: T) => string)
    item: T;
    onDelete: (item: T) => Promise<{ success: boolean; message?: string }>;
    trigger?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
};

export function DeleteItemBase<T>({
    title = "Are you sure you want to delete?",
    description,
    item,
    onDelete,
    trigger = <Button variant="ghost"><Trash color="red" /></Button>,
    confirmText = "Yes",
    cancelText = "No",
}: DeleteDialogBaseProps<T>) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            setStatus("loading");
            const result = await onDelete(item);
            setStatus(result.success ? "success" : "error");

            toast({
                title: result.success ? "Deleted successfully" : "Something went wrong",
                description: result.message,
                variant: result.success ? "default" : "destructive",
            });

            setOpen(false);
        } catch (error: any) {
            setStatus("error");
            toast({
                title: "Something went wrong",
                description: error?.message || "Unexpected error",
                variant: "destructive",
            });
        }
    };

    function handleDescription() {
        if (typeof description === "function") {
            return description(item);
        }
        return description || "You are about to delete this item.";
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                {description && <p>{handleDescription()}</p>}

                <LoadingButton
                    status={status}
                    variant="destructive"
                    className="w-full"
                    onClick={handleDelete}
                >
                    {confirmText}
                </LoadingButton>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                    {cancelText}
                </Button>
            </DialogContent>
        </Dialog>
    );
}