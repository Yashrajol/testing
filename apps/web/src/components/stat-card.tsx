import type { ReactNode } from "react";
import { motion } from "motion/react";

export function StatCard({ icon: Icon, label, value, trend, accent = "primary" }: { icon: React.ComponentType<{ className?: string }>; label: string; value: ReactNode; trend?: string; accent?: "primary" | "accent" | "warning" | "destructive" }) {
  const tone: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone[accent]}`}><Icon className="h-5 w-5" /></div>
        {trend && <span className="text-xs font-semibold text-success">{trend}</span>}
      </div>
      <div className="mt-4 font-display text-3xl font-extrabold">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}
