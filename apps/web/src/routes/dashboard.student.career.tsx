import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Target, Compass, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/career")({
  component: CareerPage,
});

const careerPaths = [
  { 
    role: "Data Scientist", 
    match: 88, 
    salary: "$110k - $150k", 
    outlook: "High Growth",
    borderTop: "border-t-brand-blue",
    textBadge: "text-brand-blue",
    bgBadge: "bg-brand-blue/10",
    bgIcon: "bg-brand-blue/5",
    skills: [
      { name: "Python", status: "met" },
      { name: "Data Analysis", status: "met" },
      { name: "Machine Learning", status: "gap" },
      { name: "SQL", status: "gap" }
    ]
  },
  { 
    role: "Product Manager", 
    match: 75, 
    salary: "$105k - $140k", 
    outlook: "Steady",
    borderTop: "border-t-brand-teal",
    textBadge: "text-brand-teal",
    bgBadge: "bg-brand-teal/10",
    bgIcon: "bg-brand-teal/5",
    skills: [
      { name: "Communication", status: "met" },
      { name: "Leadership", status: "met" },
      { name: "Agile", status: "gap" },
      { name: "UX Design", status: "gap" }
    ]
  },
  { 
    role: "Financial Analyst", 
    match: 65, 
    salary: "$85k - $120k", 
    outlook: "Competitive",
    borderTop: "border-t-brand-orange",
    textBadge: "text-brand-orange",
    bgBadge: "bg-brand-orange/10",
    bgIcon: "bg-brand-orange/5",
    skills: [
      { name: "Mathematics", status: "met" },
      { name: "Excel", status: "met" },
      { name: "Financial Modeling", status: "gap" }
    ]
  }
];

function CareerPage() {
  return (
    <>
      <PageHeader title="Career Readiness" subtitle="Align your current skills with future professional pathways." />
      
      {/* Overview Banner */}
      <GlassCard className="mt-6 p-8 bg-linear-to-r from-bg-secondary to-bg-primary border-brand-blue/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-bg-secondary" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-brand-blue" strokeDasharray="251" strokeDashoffset="30" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-black text-brand-blue">88%</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-heading">Career Alignment Score</h2>
            <p className="text-sm text-text-muted mt-1 max-w-md">Your current skill profile strongly aligns with roles in data and analytics. Closing 2 minor skill gaps will increase your match to 95%.</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold shadow-lg shadow-brand-blue/20 hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap">
          <Compass className="h-5 w-5" />
          Explore Pathways
        </button>
      </GlassCard>

      <h3 className="text-lg font-bold text-text-heading mt-10 mb-6 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-brand-teal" />
        Recommended Pathways
      </h3>

      <div className="grid gap-6 lg:grid-cols-3">
        {careerPaths.map((path, i) => (
          <GlassCard key={i} className={`p-6 border-t-4 ${path.borderTop}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-block px-2.5 py-1 ${path.bgBadge} ${path.textBadge} text-[10px] font-bold uppercase tracking-wider rounded-md mb-2`}>
                  {path.match}% Match
                </span>
                <h4 className="text-xl font-bold text-text-heading">{path.role}</h4>
              </div>
              <div className={`p-2 ${path.bgIcon} rounded-lg ${path.textBadge}`}>
                <Target className="h-6 w-6" />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs font-semibold text-text-muted mb-6 bg-bg-secondary/50 p-3 rounded-lg border border-border-default">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-normal">Salary Range</span>
                <span className="text-text-heading mt-0.5">{path.salary}</span>
              </div>
              <div className="h-6 w-px bg-border-default"></div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-wider font-normal">Outlook</span>
                <span className="text-text-heading mt-0.5">{path.outlook}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Required Skills Analysis</p>
              <div className="space-y-2">
                {path.skills.map((skill, j) => (
                  <div key={j} className="flex items-center justify-between p-2 rounded border border-border-default bg-bg-primary">
                    <span className={`text-sm font-semibold ${skill.status === 'met' ? 'text-text-body' : 'text-text-muted'}`}>{skill.name}</span>
                    {skill.status === 'met' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">Gap</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 border-2 border-border-default text-text-heading font-bold rounded-lg text-sm hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center justify-center gap-2">
              View Roadmap <ChevronRight className="h-4 w-4" />
            </button>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
