import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { StatCard } from "@/shared/ui/stat-card";
import { Building2, DollarSign, Users, Activity, ClipboardCheck, AlertCircle, RefreshCw } from "lucide-react";
import { schoolList as mockSchoolList, platformRevenue as mockPlatformRevenue, students as mockStudents } from "@/shared/constants/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "motion/react";
import { usePlatformDashboard, useSystemHealth, usePlatformAnalytics } from "@/features/super-admin/queries";
import { SkeletonCards, SkeletonCharts, HealthStatusPlaceholders } from "@/features/super-admin/components";
import { useMemo } from "react";

export const Route = createFileRoute("/dashboard/super/")({
  component: SuperOverview,
  head: () => ({ meta: [{ title: "Platform Control Center — Super Admin" }] }),
});

function SuperOverview() {
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError, refetch } = usePlatformDashboard();
  const { data: healthData, isLoading: healthLoading } = useSystemHealth();
  const { data: analyticsData } = usePlatformAnalytics();

  const isLoading = dashboardLoading || healthLoading;

  const schoolCount = useMemo(() => {
    if (dashboardData?.organizations && dashboardData.organizations.length > 0) {
      return dashboardData.organizations.length;
    }
    return mockSchoolList.length;
  }, [dashboardData]);

  const totalStudents = useMemo(() => {
    if (dashboardData?.stats?.totalStudents) return dashboardData.stats.totalStudents;
    return mockSchoolList.reduce((a, s) => a + s.students, 0);
  }, [dashboardData]);

  const mrr = useMemo(() => {
    if (dashboardData?.stats?.mrr) return dashboardData.stats.mrr;
    return mockPlatformRevenue[mockPlatformRevenue.length - 1].mrr;
  }, [dashboardData]);

  const revenueData = useMemo(() => {
    if (dashboardData?.revenueTrends && dashboardData.revenueTrends.length > 0) {
      return dashboardData.revenueTrends;
    }
    if (analyticsData?.monthlyRevenue && analyticsData.monthlyRevenue.length > 0) {
      return analyticsData.monthlyRevenue;
    }
    return mockPlatformRevenue;
  }, [dashboardData, analyticsData]);

  const completionRate = useMemo(() => {
    if (dashboardData?.stats?.assessmentCompletion) return dashboardData.stats.assessmentCompletion;
    return Math.round((mockStudents.filter((s) => s.assessmentDone).length / mockStudents.length) * 100);
  }, [dashboardData]);

  const healthMetrics = useMemo(() => {
    return {
      dbHealth: healthData?.databaseHealth || dashboardData?.health?.databaseHealth || "99.98% OK",
      latency: healthData?.apiLatencyMs || dashboardData?.health?.apiLatencyMs || 42,
      cacheHits: healthData?.pwaCacheHitRate || dashboardData?.health?.pwaCacheHitRate || 94.1,
    };
  }, [healthData, dashboardData]);

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
        <PageHeader title="Platform Control Center" subtitle="Loading platform telemetry..." />
        <SkeletonCards count={5} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SkeletonCharts />
          </div>
          <div className="lg:col-span-1">
            <HealthStatusPlaceholders />
          </div>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <GlassCard className="p-8 border border-red-100 bg-red-50/30 text-center space-y-3 my-8">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
        <h3 className="text-base font-bold text-text-heading">Failed to Load Platform Telemetry</h3>
        <p className="text-xs text-text-muted">An error occurred connecting to the NestJS super admin service endpoints.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry Telemetry Fetch
        </button>
      </GlassCard>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Platform Control Center" subtitle={`${schoolCount} schools • ${totalStudents.toLocaleString()} students`} />
      
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={DollarSign} label="MRR" value={`₹${(mrr/1000).toFixed(0)}K`} trend="▲ 14% MoM" accent="accent" />
        <StatCard icon={Building2} label="Schools Onboarded" value={schoolCount} trend="▲ 3 this month" accent="primary" />
        <StatCard icon={Users} label="Total Students" value={totalStudents.toLocaleString()} trend="▲ 8.2% YoY" accent="primary" />
        <StatCard icon={Activity} label="Active Sessions/day" value="2,486" trend="▲ 12%" accent="warning" />
        <StatCard icon={ClipboardCheck} label="Platform Self-Assessment Completion" value={`${completionRate}%`} trend="▲ 6.1%" accent="accent" />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Monthly Recurring Revenue</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" name="MRR (INR)" dataKey="mrr" stroke="var(--brand-teal)" fill="url(#mrrGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-heading mb-4">Activity Summary</h3>
              <div className="space-y-4 text-xs text-text-body text-left">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">Database Health:</span>
                  <span className="font-bold text-brand-teal">{healthMetrics.dbHealth}</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">API Latency Avg:</span>
                  <span className="font-bold text-brand-blue">{healthMetrics.latency}ms</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">PWA Cache hits:</span>
                  <span className="font-bold text-text-heading">{healthMetrics.cacheHits}%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
