import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { platformRevenue as mockPlatformRevenue } from "@/shared/constants/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Download } from "lucide-react";
import { motion } from "motion/react";
import { useBilling } from "@/features/super-admin/queries";
import { usePlatformAnalytics } from "@/features/analytics/queries";
import { ExportModal, SkeletonCharts } from "@/features/analytics/components";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/super/revenue")({
  component: SuperRevenuePage,
  head: () => ({ meta: [{ title: "Revenue Dashboard — Super Admin" }] }),
});

function SuperRevenuePage() {
  const [showExportModal, setShowExportModal] = useState(false);
  const { data: billingData } = useBilling();
  const { data: analyticsData, isLoading } = usePlatformAnalytics();

  const revenueData = useMemo(() => {
    if (analyticsData?.revenueTrends && analyticsData.revenueTrends.length > 0) {
      return analyticsData.revenueTrends;
    }
    return mockPlatformRevenue;
  }, [analyticsData]);

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

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Revenue Dashboards" subtitle="Loading monetization trends..." />
        <SkeletonCharts />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader 
        title="Revenue Dashboards" 
        subtitle="Audit platform monetization, invoicing indices, and MRR progression." 
        action={
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" /> Export Platform Financials
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* MRR progression */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Monthly Recurring Revenue Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueAnalytics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" name="MRR (INR)" dataKey="mrr" stroke="var(--brand-blue)" fill="url(#revenueAnalytics)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Breakdown bar */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Plan Distribution</h3>
            <div className="space-y-4 text-xs text-text-body">
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Enterprise Custom Contracts:</span>
                <span className="font-bold text-brand-teal">52% (₹22.4L/yr)</span>
              </div>
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Growth Volume Plans:</span>
                <span className="font-bold text-brand-blue">38% (₹16.3L/yr)</span>
              </div>
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Starter Base Plans:</span>
                <span className="font-bold text-text-heading">10% (₹4.2L/yr)</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportType="financial"
        title="Export Platform Financials Report"
      />
    </motion.div>
  );
}
