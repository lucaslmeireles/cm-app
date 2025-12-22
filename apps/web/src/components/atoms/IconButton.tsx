import { cn } from "@/repo/ui/lib/utils";
import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "outline" | "default" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
  outline: "border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800",
  default: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200",
  destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
};

const sizeStyles = {
  sm: "p-1 text-sm",
  md: "p-2 text-base",
  lg: "p-3 text-lg",
};

export const IconButton = ({
  children,
  onClick,
  variant = "ghost",
  size = "md",
  disabled = false,
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};
