import { cn } from "@/repo/ui/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  default: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
  secondary: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
