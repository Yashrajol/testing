import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Users, Briefcase, Shield } from "lucide-react";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHub,
  head: () => ({ meta: [{ title: "Dashboard Hub — Vedhkrit" }] }),
});

const roles = [
  {
    id: "student",
    title: "Student Portal",
    description: "Access your learning paths, career insights, and mentor sessions.",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-700",
    link: "/dashboard/student"
  },
  {
    id: "parent",
    title: "Parent Portal",
    description: "Track your child's progress, upcoming fees, and insights.",
    icon: Users,
    color: "bg-teal-50 text-teal-700",
    link: "/dashboard/parent"
  },
  {
    id: "mentor",
    title: "Mentor Portal",
    description: "Manage your advisory sessions, students, and curriculum.",
    icon: Briefcase,
    color: "bg-amber-50 text-amber-700",
    link: "/dashboard/mentor"
  },
  {
    id: "admin",
    title: "Admin Portal",
    description: "Overview platform analytics, user management, and center operations.",
    icon: Shield,
    color: "bg-slate-50 text-slate-700",
    link: "/dashboard/admin"
  }
];

function DashboardHub() {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10" />

      <div className="mx-auto max-w-5xl">
        <PageHeader 
          title="Welcome to Vedhkrit" 
          subtitle="Select a portal to manage your ecosystem roles."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={role.link}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:border-teal-200"
              >
                <div>
                  <div className={`inline-flex rounded-xl p-3 mb-4 ${role.color}`}>
                    <role.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-800">{role.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {role.description}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center text-xs font-bold text-teal-600 group-hover:text-teal-700">
                  Enter Portal
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
