import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { FolderGit2, FileBadge, ExternalLink, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/portfolio")({
  component: PortfolioPage,
});

const projects = [
  { title: "Predictive Analytics Engine", type: "Data Science", date: "Fall 2026", desc: "Built a Python model to predict student performance based on historical grades.", link: "github.com/project" },
  { title: "Smart Campus App", type: "Mobile Dev", date: "Spring 2026", desc: "React Native application helping students navigate campus facilities.", link: "appstore.com/smartcampus" }
];

const certifications = [
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "August 2026", status: "Verified" },
  { title: "Google Data Analytics", issuer: "Google", date: "May 2026", status: "Verified" }
];

function PortfolioPage() {
  return (
    <>
      <PageHeader title="Portfolio & Achievements" subtitle="Showcase your projects and validated certifications." />
      
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        {/* Projects */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-brand-blue" />
            Featured Projects
          </h3>
          <div className="grid gap-4">
            {projects.map((project, i) => (
              <GlassCard key={i} className="p-0 overflow-hidden group border-border-default hover:border-brand-blue/30 transition-colors">
                <div className="h-32 bg-linear-to-br from-brand-blue/80 to-brand-navy/90 p-4 flex items-end relative">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
                  <span className="relative z-10 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {project.type}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-text-heading text-lg">{project.title}</h4>
                    <span className="text-xs font-semibold text-text-muted">{project.date}</span>
                  </div>
                  <p className="text-sm text-text-muted mb-4">{project.desc}</p>
                  <button className="text-brand-blue text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    View Project <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
            <FileBadge className="h-5 w-5 text-brand-teal" />
            Certifications
          </h3>
          <div className="grid gap-4">
            {certifications.map((cert, i) => (
              <GlassCard key={i} className="p-5 flex items-center gap-5 hover:border-brand-teal/30 transition-colors">
                <div className="h-16 w-16 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                  <FileBadge className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-text-heading">{cert.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">{cert.issuer} • Issued {cert.date}</p>
                  <button className="mt-3 text-xs font-bold text-text-body hover:text-brand-teal flex items-center gap-1 transition-colors">
                    <Download className="h-3 w-3" /> Download Certificate
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
