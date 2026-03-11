import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-200 text-slate-800",
    outline: "border border-slate-200 text-slate-900",
  };

  return (
    <div
      className={cn("inline-flex items-center border border-transparent text-xs font-medium", variantClasses[variant], className)}
      {...props}
    />
  );
}
