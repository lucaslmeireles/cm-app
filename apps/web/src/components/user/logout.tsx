"use client";
import { Logout } from "@/actions/logout.action";
import { signOut } from "@/auth";
import { Button } from "@/repo/ui/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  return (
      <Button variant="ghost" className="text-white" onClick={()=> Logout()}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
  );
};
