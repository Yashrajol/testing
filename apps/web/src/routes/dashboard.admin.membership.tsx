import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { CreditCard, Award, Calendar, RefreshCw, FileText, Download, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin/membership")({
  component: SchoolMembershipPage,
  head: () => ({ meta: [{ title: "Membership & Billing — School Admin" }] }),
});

const billingPlans = [
  { id: "starter", name: "Starter", price: "₹999", desc: "For small institutes exploring diagnostics.", features: ["Up to 150 Student slots", "Core Aptitude Testing", "Basic School-wide reports", "Standard email support"] },
  { id: "growth", name: "Growth", price: "₹2,499", desc: "Our most popular plan for active cohort development.", features: ["Up to 500 Student slots", "Full AI Cognitive diagnostics", "Custom mentor alignment charts", "Dedicated support manager", "API & LMS integrations"] },
  { id: "enterprise", name: "Enterprise", price: "Custom", desc: "For large school systems and groups.", features: ["Unlimited Student slots", "Bespoke stream alignments", "Custom center deployment", "24/7 Priority SLA support", "White-labeled dashboards"] }
];

const initialTransactions = [
  { id: "TXN1029", date: "Mar 10, 2026", amount: "₹12,49,500", type: "Annual renewal (500 slots)", status: "Successful" },
  { id: "TXN0982", date: "Mar 12, 2025", amount: "₹9,99,600", type: "Annual renewal (400 slots)", status: "Successful" },
  { id: "TXN0841", date: "Sep 18, 2024", amount: "₹2,49,900", type: "Capacity boost (+100 slots)", status: "Successful" }
];

function SchoolMembershipPage() {
  const [activePlan, setActivePlan] = useState("growth");
  const [billingCycle, setBillingCycle] = useState("annually");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);

  const currentPlan = billingPlans.find(p => p.id === activePlan) || billingPlans[1];

  const handleUpgrade = (planId: string) => {
    if (planId === activePlan) {
      toast.info("You are already on this plan!");
      return;
    }
    setIsUpgrading(planId);
    
    // Simulate payment transaction
    setTimeout(() => {
      setActivePlan(planId);
      setIsUpgrading(null);
      const randomId = "TXN" + Math.floor(1000 + Math.random() * 9000);
      const now = new Date();
      const dateString = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const newTxn = {
        id: randomId,
        date: dateString,
        amount: planId === "enterprise" ? "Custom Quote" : "₹12,49,500",
        type: `Upgrade to ${planId.toUpperCase()} Plan`,
        status: "Successful"
      };
      setTransactions([newTxn, ...transactions]);
      toast.success(`Successfully subscribed to the ${planId.toUpperCase()} plan!`, {
        description: "Your invoice and transaction confirmation have been generated."
      });
    }, 1500);
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
      <PageHeader title="Membership & Billing" subtitle="Manage your school's active licenses, upgrade student capacity, and view payment histories." />

      {/* Top metrics summary */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Award} label="Current Package Plan" value={currentPlan.name} accent="primary" />
        <StatCard icon={CreditCard} label="Billing Period" value={billingCycle === "annually" ? "Annually" : "Monthly"} accent="accent" />
        <StatCard icon={Calendar} label="Licensing Renewal Date" value="March 10, 2027" accent="warning" />
      </motion.div>

      {/* Capacity tracker and transaction list */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Capacity tracker */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <div className="flex items-center justify-between border-b border-border-default/40 pb-3 mb-4">
              <h3 className="text-base font-bold text-text-heading">Capacity Allocation</h3>
              <span className="text-[10px] text-brand-blue font-bold">Active License</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-text-heading">Student Seats Filled</span>
                <span className="text-brand-blue">412 / 500 Slots</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100 border border-border-default/30">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "82.4%" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full gradient-brand"
                />
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                You have used <b>82.4%</b> of your active slots. Mapped students can access cognitive testing suite, AI portfolios, and direct advisor chats.
              </p>
            </div>
          </GlassCard>

          {/* Transactions list */}
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-blue" />
              Transactions Log
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Order ID</th>
                    <th className="py-2.5 font-bold">Billing Date</th>
                    <th className="py-2.5 font-bold">Description</th>
                    <th className="py-2.5 font-bold text-center">Status</th>
                    <th className="py-2.5 font-bold text-right">Amount</th>
                    <th className="py-2.5 font-bold text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-semibold text-text-heading">{txn.id}</td>
                      <td className="py-3 text-text-muted font-medium">{txn.date}</td>
                      <td className="py-3 text-text-body font-semibold">{txn.type}</td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center rounded-full bg-teal-50 border border-teal-150 px-2 py-0.5 text-[8.5px] font-bold text-brand-teal uppercase">
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-text-heading">{txn.amount}</td>
                      <td className="py-3 text-right">
                        <button className="rounded bg-white border border-border-default p-1 text-brand-blue hover:text-brand-teal transition-all inline-flex items-center gap-1 cursor-pointer">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base font-bold text-text-heading mb-4 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-brand-blue animate-spin-slow" />
                Change Cycles
              </h3>
              
              <div className="flex rounded-xl bg-slate-100/80 p-1 border border-border-default/30">
                <button 
                  onClick={() => setBillingCycle("monthly")}
                  className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all ${
                    billingCycle === "monthly" ? "bg-white text-brand-blue shadow-sm" : "text-text-muted hover:text-text-body"
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setBillingCycle("annually")}
                  className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all ${
                    billingCycle === "annually" ? "bg-white text-brand-blue shadow-sm" : "text-text-muted hover:text-text-body"
                  }`}
                >
                  Annually (-15%)
                </button>
              </div>
              <p className="mt-3.5 text-[10px] text-text-muted leading-relaxed">
                Billing periods switch on the next statement date. Annual memberships receive custom diagnostics volume discounts.
              </p>
            </div>
            
            <button className="mt-6 w-full text-center rounded-xl gradient-brand py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
              View Active Agreements
            </button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Plans selector grid */}
      <motion.div variants={itemVariants} className="pt-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="font-display text-lg font-bold text-text-heading">Upgrade Licensing Packages</h3>
          <p className="text-xs text-text-muted mt-1">Select a matching structure suited for your institute expansion.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {billingPlans.map((plan) => {
            const isActive = plan.id === activePlan;
            return (
              <GlassCard 
                key={plan.id} 
                className={`p-5 border flex flex-col justify-between text-left transition-all ${
                  isActive 
                    ? "border-brand-blue bg-brand-blue/5 shadow-lg shadow-brand-blue/5" 
                    : "border-border-default/50 bg-white/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border-default/40 pb-3 mb-4">
                    <span className="font-display text-sm font-bold text-text-heading">{plan.name}</span>
                    {isActive && (
                      <span className="rounded-full bg-brand-blue text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                        Active Plan
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-extrabold text-text-heading">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-[10px] text-text-muted font-bold">/student/year</span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted leading-normal mt-2 h-10">{plan.desc}</p>
                  </div>

                  <ul className="mt-5 space-y-2 border-t border-border-default/30 pt-4 text-[10px] text-text-body">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isUpgrading !== null}
                  className={`mt-6 w-full text-center py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? "bg-slate-200 text-text-muted cursor-not-allowed" 
                      : isUpgrading === plan.id
                      ? "bg-brand-blue/20 text-brand-blue animate-pulse cursor-wait"
                      : "gradient-brand text-white shadow-md hover:opacity-95"
                  }`}
                >
                  {isActive ? "Currently Active" : isUpgrading === plan.id ? "Processing..." : plan.price === "Custom" ? "Contact Sales" : "Upgrade Plan"}
                </button>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
