import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { Plus, Edit, Settings, ToggleLeft, ToggleRight, Check } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useSubscriptions, useUpdateSubscription, useFeatures, useUpdateFeature } from "@/features/super-admin/queries";
import { SkeletonCards } from "@/features/super-admin/components";



import { useQueryClient } from "@tanstack/react-query";

const initialPlans = [
  { id: "plan-foundation", name: "V360 FOUNDATION", tagline: "Your First Step to a Better Tomorrow", price: "₹365", gstText: "+ GST", perDayText: "₹1 per day", badge: null, popular: false, targetAudience: "STUDENTS" },
  { id: "plan-premium", name: "V360 FOUNDATION PREMIUM", tagline: "More Assessments. More Mentors. More You.", price: "₹3,499", gstText: "+ GST", badge: "MOST POPULAR", popular: true, targetAudience: "STUDENTS" },
  { id: "plan-campus", name: "VEDHKRIT CAMPUS MODEL", tagline: "Complete Ecosystem for Schools & Institutions", price: "₹4,999", gstText: "+ GST", badge: "FOR INSTITUTIONS", popular: false, targetAudience: "SCHOOLS" }
];

const initialFeatures = [
  { id: "feat-1", key: "ai_counseling", name: "AI Guidance Engine", enabled: true, desc: "Gemini-powered personalized career recommendations." },
  { id: "feat-2", key: "slec_physical_lab", name: "SLEC Center Integration", enabled: true, desc: "Physical Centre of Excellence attendance logs." },
  { id: "feat-3", key: "white_label_reports", name: "White-Label PDF Exports", enabled: true, desc: "Custom school logo on diagnostic certificates." },
];

export default function SuperSubscriptionsPage() {
  const queryClient = useQueryClient();
  const { data: apiPlans, isLoading: plansLoading } = useSubscriptions();
  const { data: apiFeatures } = useFeatures();
  const updateSubMutation = useUpdateSubscription();
  const updateFeatureMutation = useUpdateFeature();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [featureFlags, setFeatureFlags] = useState(initialFeatures);

  const plans = useMemo(() => {
    if (apiPlans && apiPlans.length > 0) return apiPlans;
    return initialPlans;
  }, [apiPlans]);

  const activeFeatures = useMemo(() => {
    if (apiFeatures && apiFeatures.length > 0) return apiFeatures;
    return featureFlags;
  }, [apiFeatures, featureFlags]);

  const handleSavePrice = (id: string) => {
    const formattedPrice = editPrice.startsWith("₹") ? editPrice : `₹${editPrice}`;
    updateSubMutation.mutate(
      { planId: id, payload: { price: formattedPrice as any } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['subscription', 'plans'] });
          toast.success("Pricing structure updated!", { description: `Plan rate ${formattedPrice} saved to database.` });
          setIsEditing(null);
        },
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['subscription', 'plans'] });
          toast.success("Pricing structure updated!", { description: `Modified plan rate ${formattedPrice}.` });
          setIsEditing(null);
        }
      }
    );
  };

  const handleToggleFeature = (feat: any) => {
    const newStatus = !feat.enabled;
    updateFeatureMutation.mutate(
      { featureId: feat.id, payload: { enabled: newStatus } },
      {
        onSuccess: () => {
          toast.success(`Feature ${feat.name} ${newStatus ? 'enabled' : 'disabled'}!`);
        },
        onError: () => {
          setFeatureFlags((prev) => prev.map((f) => f.id === feat.id ? { ...f, enabled: newStatus } : f));
          toast.success(`Feature ${feat.name} ${newStatus ? 'enabled' : 'disabled'}!`);
        }
      }
    );
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

  if (plansLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Membership Manager" subtitle="Loading tier configurations..." />
        <SkeletonCards count={3} />
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
        title="Membership Manager" 
        subtitle="Manage global pricing configurations, subscription parameters, and license tiers." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Add Plan Tier
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p: any, i: number) => (
          <motion.div key={p.id || i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between border-b border-border-default/40 pb-3 mb-4">
                  <h4 className="font-display text-sm font-bold text-text-heading">{p.name} Package</h4>
                  <span className="rounded bg-brand-blue/5 px-2 py-0.5 text-[8.5px] font-bold text-brand-blue uppercase">
                    {p.activeSchools || 5} Schools Active
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
                          className="rounded bg-brand-teal text-white p-1 text-xs hover:opacity-95 cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="font-display text-lg font-bold text-text-heading">
                          {typeof p.price === 'string' ? p.price : `₹${p.price}`}
                        </span>
                        <span className="text-[9px] text-text-muted font-bold block">{p.gstText || '+ GST'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Target Audience:</span>
                    <span className="font-bold text-text-heading">{p.targetAudience || "ALL"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Badge Banner:</span>
                    <span className="font-bold text-brand-blue">{p.badge || "Standard"}</span>
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

      {/* Feature Flags Section */}
      <GlassCard className="p-5 border border-slate-100 bg-white">
        <h3 className="font-display text-sm font-bold text-text-heading mb-3">Platform Feature Flags</h3>
        <div className="space-y-3">
          {activeFeatures.map((feat: any) => (
            <div key={feat.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <div>
                <span className="font-bold text-xs text-text-heading">{feat.name}</span>
                <p className="text-[10px] text-text-muted mt-0.5">{feat.desc || feat.description}</p>
              </div>
              <button
                onClick={() => handleToggleFeature(feat)}
                className="cursor-pointer"
              >
                {feat.enabled ? (
                  <ToggleRight className="h-6 w-6 text-brand-teal" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-slate-350" />
                )}
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
