import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { CreditCard, Plus, Edit, Trash, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/super/subscriptions")({
  component: SuperSubscriptionsPage,
  head: () => ({ meta: [{ title: "Subscriptions Controls — Super Admin" }] }),
});

const initialPlans = [
  { id: "starter", name: "Starter", price: 999, cycle: "Annually", slots: 150, activeSchools: 7 },
  { id: "growth", name: "Growth", price: 2499, cycle: "Annually", slots: 500, activeSchools: 9 },
  { id: "enterprise", name: "Enterprise", price: 0, cycle: "Custom", slots: 0, activeSchools: 4 }
];

function SuperSubscriptionsPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  const handleSavePrice = (id: string) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, price: parseFloat(editPrice) || 0 };
      }
      return p;
    }));
    setIsEditing(null);
    toast.success("Pricing plan structure successfully modified!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <PageHeader 
        title="Membership Manager" 
        subtitle="Manage global pricing configurations, subscription parameters, and license tiers." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            <Plus className="h-4 w-4 inline mr-1" />
            Add Plan Tier
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div key={p.id} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between border-b border-border-default/40 pb-3 mb-4">
                  <h4 className="font-display text-sm font-bold text-text-heading">{p.name} Package</h4>
                  <span className="rounded bg-brand-blue/5 px-2 py-0.5 text-[8.5px] font-bold text-brand-blue uppercase">
                    {p.activeSchools} Schools Active
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-text-muted">Standard Rate:</span>
                    {isEditing === p.id ? (
                      <div className="flex gap-1.5 items-center">
                        <input 
                          type="text" 
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-16 rounded border border-border-default bg-white px-1.5 py-0.5 text-xs text-text-body font-bold outline-none"
                        />
                        <button 
                          onClick={() => handleSavePrice(p.id)}
                          className="rounded bg-brand-teal text-white p-1 text-xs hover:opacity-95"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="font-display text-lg font-bold text-text-heading">
                          {p.price > 0 ? `₹${p.price.toLocaleString()}` : "Custom Quote"}
                        </span>
                        {p.price > 0 && <span className="text-[9px] text-text-muted font-bold block">/student/year</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Student Seat Limit:</span>
                    <span className="font-bold text-text-heading">{p.slots > 0 ? `${p.slots} seats` : "Bespoke volume"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Billing Interval:</span>
                    <span className="font-bold text-text-heading">{p.cycle}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3.5 border-t border-border-default/35 flex gap-2">
                <button 
                  onClick={() => {
                    setIsEditing(p.id);
                    setEditPrice(String(p.price));
                  }}
                  className="flex-1 text-center rounded-xl border border-border-default bg-white/70 py-2.5 text-[10px] font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit Rates
                </button>
                <button className="rounded-xl border border-border-default bg-white p-2.5 text-text-heading hover:bg-bg-secondary hover:text-brand-teal transition-all cursor-pointer">
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
