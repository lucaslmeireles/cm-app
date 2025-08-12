import { cn } from "@/repo/ui/lib/utils";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small";
  color?: "primary" | "secondary" | "muted" | "error" | "success";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

const variantStyles = {
  h1: "text-3xl md:text-4xl font-bold",
  h2: "text-2xl md:text-3xl font-semibold",
  h3: "text-xl md:text-2xl font-medium",
  h4: "text-lg md:text-xl font-medium",
  body: "text-base",
  caption: "text-sm",
  small: "text-xs",
};

const colorStyles = {
  primary: "text-slate-900 dark:text-slate-100",
  secondary: "text-slate-700 dark:text-slate-300",
  muted: "text-slate-500 dark:text-slate-400",
  error: "text-red-600 dark:text-red-400",
  success: "text-green-600 dark:text-green-400",
};

const weightStyles = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Text = ({
  children,
  variant = "body",
  color = "primary",
  weight = "normal",
  className,
}: TextProps) => {
  const Component = variant.startsWith("h") ? variant : "p";

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        weightStyles[weight],
        className
      )}
    >
      {children}
    </Component>
  );
};
