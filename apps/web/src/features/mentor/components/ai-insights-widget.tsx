import React, { useState } from 'react';
import { GlassCard } from '@/shared/ui/glass-card';
import { Sparkles, Brain, Loader2, Send } from 'lucide-react';
import { useGenerateAIInsights } from '../queries/useMentor';
import { AIInsight } from '../types';

export function AIMentorInsightsWidget({ studentId, studentName }: { studentId?: string; studentName?: string }) {
  const [prompt, setPrompt] = useState('');
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const generateMutation = useGenerateAIInsights();

  const handleGenerate = () => {
    generateMutation.mutate(
      { studentId, prompt: prompt || 'Provide personalized mentoring strategy and growth recommendations.' },
      {
        onSuccess: (data) => {
          setInsight(data);
        },
      }
    );
  };

  return (
    <GlassCard className="p-5 border border-purple-100 bg-linear-to-br from-purple-50/50 via-white to-blue-50/50 text-left">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-xs font-bold text-text-heading">AI Mentor Assistant</h3>
            <p className="text-[9.5px] text-text-muted">
              {studentName ? `Generating tailored insights for ${studentName}` : 'Cohort-wide AI recommendations'}
            </p>
          </div>
        </div>
        <span className="text-[8px] font-black uppercase tracking-wider rounded-full bg-purple-100 text-purple-700 px-2 py-0.5">
          Powered by Gemini
        </span>
      </div>

      {!insight ? (
        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              studentName
                ? `Ask AI for advisory tips for ${studentName} (e.g. How to improve physics engagement?)`
                : 'Ask AI for cohort advisory strategy or intervention recommendations...'
            }
            className="w-full rounded-xl border border-slate-200 bg-white/90 p-2.5 text-xs text-text-body outline-none focus:border-purple-500 min-h-16 resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Analyzing Learner Data...
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5" />
                Generate Insights
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-white/80 border border-purple-100 text-text-body">
            <p className="font-semibold text-purple-900 mb-2 leading-relaxed">{insight.summary}</p>
            {insight.actionablePoints && insight.actionablePoints.length > 0 && (
              <ul className="space-y-1 list-disc pl-4 text-text-muted text-[11px]">
                {insight.actionablePoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => setInsight(null)}
            className="text-[10px] text-purple-700 font-bold hover:underline"
          >
            ← Ask Another Question
          </button>
        </div>
      )}
    </GlassCard>
  );
}
