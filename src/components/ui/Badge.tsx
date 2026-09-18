import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "mint" | "slate" | "amber" | "outline";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  className,
  dot = false,
}) => {
  const variants = {
    cyan: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan dark:text-[#aed9e0]",
    mint: "border-brand-mint/25 bg-brand-mint/10 text-[#0d9488] dark:text-brand-mint",
    slate: "border-brand-slate/30 bg-brand-slate/10 text-zinc-700 dark:text-zinc-300",
    amber: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    outline: "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 bg-transparent",
  };

  const dots = {
    cyan: "bg-brand-cyan shadow-[0_0_6px_#aed9e0]",
    mint: "bg-brand-mint shadow-[0_0_6px_#b8f2e6]",
    slate: "bg-zinc-400",
    amber: "bg-amber-400 shadow-[0_0_6px_#f59e0b]",
    outline: "bg-zinc-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium font-tech tracking-wide transition-colors",
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dots[variant])} />}
      {children}
    </span>
  );
};
