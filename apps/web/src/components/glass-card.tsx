import { motion } from "motion/react";
import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  strong?: boolean;
}

export function GlassCard({ children, className, delay = 0, strong, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl p-6",
        className,
      )}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}
