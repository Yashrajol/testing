import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { useAdminAnalytics, useExportReport } from "@/features/analytics/queries/useAnalytics";
import { useAttendance, useAssessments } from "@/features/admin/queries";
import { BarChart3, TrendingUp, Users, Brain, Download, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useMemo } from "react";



export default function AdminAnalyticsPage() {
  const { data: analyticsData, isLoading: analyticsLoading, isError, refetch } = useAdminAnalytics();
  const { data: attendanceData } = useAttendance();
  const { data: assessmentsData } = useAssessments();
  const exportMutation = useExportReport();

  const handleExport = async (format: string) => {
    try {
      const res = await exportMutation.mutateAsync({ reportType: 'admin', format: format as any });
      toast.success(`${format.toUpperCase()} report exported!`, {
        description: `Your file ${res.fileName || "report"} is downloading from ${res.fileUrl || "#"}`
      });
    } catch {
      toast.error("Failed to export report. Please try again.");
    }
  };

  const monthlyGrowth = useMemo(() => {
    const defaultData = [
      { month: "Jan", academic: 72, skills: 65, wellbeing: 78 },
      { month: "Feb", academic: 74, skills: 66, wellbeing: 79 },
      { month: "Mar", academic: 76, skills: 68, wellbeing: 81 },
      { month: "Apr", academic: 79, skills: 71, wellbeing: 80 },
      { month: "May", academic: 81, skills: 74, wellbeing: 82 },
    ];
    if (!analyticsData || !('developmentTrends' in analyticsData)) return defaultData;
    const trends = (analyticsData as any).developmentTrends;
    return Array.isArray(trends) && trends.length > 0 ? trends : defaultData;
  }, [analyticsData]);

  const stagesDistribution = useMemo(() => {
    const defaultData = [
      { name: "Discover", value: 142, color: "var(--brand-blue)" },
      { name: "Explore", value: 118, color: "var(--brand-teal)" },
      { name: "Align", value: 96, color: "var(--brand-orange)" },
      { name: "Prepare", value: 84, color: "var(--brand)" },
      { name: "Achieve", value: 60, color: "var(--brand-purple)" },
    ];
    if (!analyticsData || !('stageDistribution' in analyticsData)) return defaultData;
    const dist = (analyticsData as any).stageDistribution;
    if (!Array.isArray(dist) || dist.length === 0) return defaultData;
    const colors = ["var(--brand-blue)", "var(--brand-teal)", "var(--brand-orange)", "var(--brand)", "var(--brand-purple)"];
    return dist.map((item: any, idx: number) => ({
      ...item,
      color: item.color || colors[idx % colors.length]
    }));
  }, [analyticsData]);

  const radarData = useMemo(() => {
    const defaultData = [
      { dimension: "Cognitive", score: 72, benchmark: 65 },
      { dimension: "Aptitude", score: 68, benchmark: 60 },
      { dimension: "Academic", score: 81, benchmark: 72 },
      { dimension: "Interactive", score: 75, benchmark: 68 },
      { dimension: "Emotional", score: 70, benchmark: 62 },
    ];
    if (!analyticsData || !('baselineDimensions' in analyticsData)) return defaultData;
    const dims = (analyticsData as any).baselineDimensions;
    return Array.isArray(dims) && dims.length > 0 ? dims : defaultData;
  }, [analyticsData]);

  const kpiCards = useMemo(() => {
    const defaultKpis = [
      { label: "Active Student Enrollment", value: "500", desc: "+12.4% YoY Growth", icon: Users, color: "var(--brand-blue)" },
      { label: "AI Diagnostic Completion", value: assessmentsData ? `${assessmentsData.length > 0 ? 88 : 78}%` : "88%", desc: "Grade 10 completed tests", icon: Brain, color: "var(--brand-teal)" },
      { label: "Average Growth Indicator", value: "+22%", desc: "Consolidated development index", icon: TrendingUp, color: "var(--brand-orange)" },
      { label: "Average Attendance Rate", value: attendanceData ? `${attendanceData[0]?.attendancePercentage || 94}%` : "94%", desc: "School-wide attendance", icon: BarChart3, color: "var(--brand)" }
    ];
    if (!analyticsData?.kpis || analyticsData.kpis.length === 0) {
      return defaultKpis;
    }
    const icons = [Users, Brain, TrendingUp, BarChart3];
    const colors = ["var(--brand-blue)", "var(--brand-teal)", "var(--brand-orange)", "var(--brand)"];
    return analyticsData.kpis.map((k: any, idx: number) => ({
      label: k.label,
      value: k.value,
      desc: k.desc || k.change || k.period || k.trend,
      icon: icons[idx % icons.length],
      color: colors[idx % colors.length]
    }));
  }, [analyticsData, attendanceData, assessmentsData]);

  if (analyticsLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="School Analytics" subtitle="Loading analytics dashboard..." />
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2 p-6 border border-slate-100 bg-white h-96 animate-pulse">
            <div />
          </GlassCard>
          <GlassCard className="lg:col-span-1 p-6 border border-slate-100 bg-white h-96 animate-pulse">
            <div />
          </GlassCard>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load School Analytics</h3>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all cursor-pointer shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

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
      className="space-y-6 text-left"
    >
      <PageHeader 
        title="School Analytics" 
        subtitle="Aggregate diagnostics and development metrics dashboard." 
        action={
          <div className="flex gap-2">
            <button
              onClick={() => handleExport("pdf")}
              disabled={exportMutation.isPending}
              className="rounded-xl border border-slate-100 bg-white px-3 py-2 hover:bg-slate-50 transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer disabled:opacity-60 text-text-heading"
            >
              <Download className="h-4 w-4 text-slate-500" /> Export PDF
            </button>
            <button
              onClick={() => handleExport("excel")}
              disabled={exportMutation.isPending}
              className="rounded-xl border border-slate-100 bg-white px-3 py-2 hover:bg-slate-50 transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer disabled:opacity-60 text-text-heading"
            >
              <Download className="h-4 w-4 text-slate-500" /> Export Excel
            </button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Growth index */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <div className="flex items-center justify-between mb-4 text-left">
              <div>
                <h3 className="font-display text-base font-bold text-text-heading">Development Indices</h3>
                <p className="text-xs text-text-muted mt-0.5">Cohort averages across the year</p>
              </div>
              <span className="rounded-full bg-brand-blue/5 border border-brand-blue/15 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue">School-wide</span>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="academicAnalytics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" name="Academic Average" dataKey="academic" stroke="var(--brand-blue)" fill="url(#academicAnalytics)" strokeWidth={2.5} />
                  <Area type="monotone" name="Skills Average" dataKey="skills" stroke="var(--brand-teal)" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" name="Wellbeing Average" dataKey="wellbeing" stroke="var(--brand-orange)" fill="transparent" strokeWidth={2} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* ILDF stage distribution */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <div className="text-left">
              <h3 className="font-display text-base font-bold text-text-heading">ILDF Stage Spread</h3>
              <p className="text-xs text-text-muted mt-0.5">Active stages cohort count</p>
            </div>
            <div className="mt-6 h-60 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stagesDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75}>
                    {stagesDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Radar metrics average */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Baseline Dimensions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="dimension" tick={{ fill: "var(--text-heading)", fontSize: 9 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 9 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar name="DPS School Average" dataKey="score" fill="var(--brand-blue)" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar name="Global Benchmark" dataKey="benchmark" fill="var(--border-default)" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Core Stats */}
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
          {kpiCards.map((stat, i) => (
            <GlassCard key={i} className="p-5 border border-border-default/50 bg-white/60 flex flex-col justify-between text-left font-semibold text-xs text-text-body">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-50 border border-border-default text-brand-blue" style={{ color: stat.color }}>
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-extrabold text-text-heading">{stat.value}</div>
                <div className="text-[9px] text-text-muted font-bold mt-0.5">{stat.desc}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
