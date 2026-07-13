import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Sliders, Eye, Save, Monitor, Tablet, Smartphone, Globe, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useCmsPage, useUpdateCmsSection } from "@/lib/api";

export const Route = createFileRoute("/dashboard/admin/cms")({
  component: BasicCmsPage,
  head: () => ({ meta: [{ title: "Basic CMS — School Admin" }] }),
});

const defaultCmsContent: Record<string, Record<string, { title: string; subtitle: string; desc: string; ctaLabel: string; ctaLink: string; badge: string }>> = {
  homepage: {
    hero: {
      title: "From Potential to Purpose",
      subtitle: "Discover, Align & Prepare for Future Careers",
      desc: "An integrated learner development platform combining AI-powered diagnostics, expert human mentoring, and physical Centre of Excellence laboratories.",
      ctaLabel: "Begin Exploration",
      ctaLink: "/assessment",
      badge: "AI-Powered Counseling Platform"
    },
    journey: {
      title: "The 7-Step Development Journey",
      subtitle: "Maturity phases to chart career readiness",
      desc: "Our sequential roadmap guides students through self-awareness and aptitude mapping, ensuring stream selection matches capabilities.",
      ctaLabel: "Explore Path",
      ctaLink: "/framework",
      badge: "Structure Program"
    }
  },
  about: {
    hero: {
      title: "Empowering Next-Gen Minds",
      subtitle: "Why Vedhkrit Exists",
      desc: "We bridge the gap between classroom theory and real-world execution through diagnostic insights and structured physical lab environments.",
      ctaLabel: "Read Our Story",
      ctaLink: "/about",
      badge: "Our Philosophy"
    }
  }
};

function BasicCmsPage() {
  const [page, setPage] = useState("homepage");
  const [section, setSection] = useState("hero");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const { data: pageData, isLoading } = useCmsPage(page);
  const updateCmsSection = useUpdateCmsSection();
  
  const [localContent, setLocalContent] = useState<any>(null);

  useEffect(() => {
    if (pageData && Object.keys(pageData).length > 0) {
      setLocalContent(pageData[section] || { title: "", subtitle: "", desc: "", ctaLabel: "", ctaLink: "", badge: "" });
    } else {
      setLocalContent(defaultCmsContent[page]?.[section] || { title: "", subtitle: "", desc: "", ctaLabel: "", ctaLink: "", badge: "" });
    }
  }, [pageData, page, section]);

  const handleFieldChange = (field: string, value: string) => {
    setLocalContent((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateCmsSection.mutate(
      { slug: page, sectionKey: section, content: localContent },
      {
        onSuccess: () => {
          toast.success("CMS Section Updated Successfully!", {
            description: `Changes published to ${page.toUpperCase()} > ${section.toUpperCase()} component.`
          });
        },
        onError: (err: any) => {
          toast.error("Failed to save changes", { description: err.message });
        }
      }
    );
  };

  const activeContent = localContent || { title: "", subtitle: "", desc: "", ctaLabel: "", ctaLink: "", badge: "" };

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
      <PageHeader title="Basic CMS Control Panel" subtitle="Manage website content blocks and view real-time changes instantly." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor Form */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-border-default/40 pb-3 mb-2">
                <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
                  <Sliders className="h-5 w-5" />
                </div>
                <h3 className="text-base font-display font-bold text-text-heading">Visual Editor</h3>
              </div>

              {/* Selector fields */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Target Page</label>
                  <select 
                    value={page}
                    onChange={(e) => {
                      setPage(e.target.value);
                      // Fallback section if page changes
                      if (e.target.value === "about") setSection("hero");
                    }}
                    className="w-full rounded-xl border border-border-default bg-white px-3 py-2.5 text-xs text-text-body font-semibold outline-none shadow-sm focus:border-brand-blue"
                  >
                    <option value="homepage">Homepage</option>
                    <option value="about">About Us Page</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Target Section</label>
                  <select 
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full rounded-xl border border-border-default bg-white px-3 py-2.5 text-xs text-text-body font-semibold outline-none shadow-sm focus:border-brand-blue"
                  >
                    <option value="hero">Hero Slide</option>
                    {page === "homepage" && <option value="journey">7-Step Journey</option>}
                  </select>
                </div>
              </div>

              {/* Edit forms */}
              <div className="space-y-3.5 pt-2">
                {activeContent.badge !== undefined && (
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Badge Text</label>
                    <input 
                      type="text" 
                      value={activeContent.badge}
                      onChange={(e) => handleFieldChange("badge", e.target.value)}
                      className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue"
                    />
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Header Title</label>
                  <input 
                    type="text" 
                    value={activeContent.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body font-semibold outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Subtitle</label>
                  <input 
                    type="text" 
                    value={activeContent.subtitle}
                    onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                    className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Body Description</label>
                  <textarea 
                    rows={4}
                    value={activeContent.desc}
                    onChange={(e) => handleFieldChange("desc", e.target.value)}
                    className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue resize-none"
                  />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">CTA Label</label>
                    <input 
                      type="text" 
                      value={activeContent.ctaLabel}
                      onChange={(e) => handleFieldChange("ctaLabel", e.target.value)}
                      className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">CTA Link Route</label>
                    <input 
                      type="text" 
                      value={activeContent.ctaLink}
                      onChange={(e) => handleFieldChange("ctaLink", e.target.value)}
                      className="w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={updateCmsSection.isPending}
              className="mt-6 w-full text-center rounded-xl gradient-brand py-3 text-xs font-bold text-white shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {updateCmsSection.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Publishing Edits...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Publish Changes
                </>
              )}
            </button>
          </GlassCard>
        </motion.div>

        {/* Live Preview Column */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 h-full">
          {/* Device toggle */}
          <div className="flex justify-between items-center bg-white/70 backdrop-blur-md rounded-2xl border border-border-default px-4 py-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-brand-teal" />
              Live Preview
            </span>
            <div className="flex gap-1">
              {[
                { id: "desktop", icon: Monitor },
                { id: "tablet", icon: Tablet },
                { id: "mobile", icon: Smartphone }
              ].map(dev => (
                <button
                  key={dev.id}
                  onClick={() => setPreviewDevice(dev.id as any)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    previewDevice === dev.id 
                      ? "bg-brand-navy border-brand-navy text-white" 
                      : "bg-white border-border-default text-text-heading hover:bg-bg-secondary"
                  }`}
                >
                  <dev.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview frame container */}
          <div className="flex-1 rounded-2xl border border-border-default/50 bg-slate-100 p-4 min-h-[480px] flex items-center justify-center overflow-hidden relative">
            <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] font-bold text-text-muted">
              <Globe className="h-3.5 w-3.5 text-brand-blue" />
              dpsbangalore.vedhkrit.in
            </div>

            {/* Simulated frame width based on device toggle */}
            <motion.div 
              animate={{ 
                width: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "75%" : "45%" 
              }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl shadow-md border border-border-default overflow-y-auto max-h-[440px] text-left"
            >
              {/* Marketing navbar preview */}
              <div className="border-b border-border-default/40 px-4 py-2.5 flex items-center justify-between bg-white">
                <span className="text-xs font-black text-brand-navy tracking-tight uppercase">VEDHKRIT</span>
                <div className="flex gap-2">
                  <div className="h-1.5 w-8 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-8 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Dynamic preview content */}
              <div className="p-6 space-y-4">
                {activeContent.badge && (
                  <span className="inline-block rounded-full bg-brand-blue/5 border border-brand-blue/15 px-2.5 py-0.5 text-[8px] font-bold text-brand-blue uppercase tracking-wider">
                    {activeContent.badge}
                  </span>
                )}
                
                <h2 className="font-display text-lg sm:text-xl font-bold text-text-heading leading-tight">
                  {activeContent.title}
                </h2>
                
                {activeContent.subtitle && (
                  <h3 className="text-xs font-semibold text-brand-teal">
                    {activeContent.subtitle}
                  </h3>
                )}

                <p className="text-[11px] text-text-body leading-relaxed">
                  {activeContent.desc}
                </p>

                <div className="pt-2">
                  <button className="rounded-lg gradient-brand px-4 py-2 text-[10px] font-bold text-white shadow-sm cursor-pointer">
                    {activeContent.ctaLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
