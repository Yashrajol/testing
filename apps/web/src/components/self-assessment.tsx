import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, PartyPopper } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Question {
  q: string;
  options: string[];
}

// Simple, friendly self-assessment for Class 8–10 students. No right or wrong
// answers — it helps Veda understand how each student learns best.
const QUESTIONS: Question[] = [
  {
    q: "How do you learn best?",
    options: [
      "Watching videos and pictures",
      "Reading and writing notes",
      "Listening to someone explain",
      "Doing hands-on activities",
    ],
  },
  {
    q: "Which subject do you enjoy the most?",
    options: ["Maths", "Science", "English & Languages", "Social Studies", "Computers"],
  },
  {
    q: "How do you feel about tests and exams?",
    options: ["Very confident", "Mostly okay", "A little nervous", "I get worried"],
  },
  {
    q: "When you get stuck on a problem, what do you do?",
    options: [
      "Keep trying on my own",
      "Ask a friend or teacher",
      "Look it up online",
      "Take a short break and try again",
    ],
  },
  {
    q: "What would you like to become in the future?",
    options: ["Engineer", "Doctor", "Teacher", "Business owner", "Not sure yet — still exploring"],
  },
];

export function SelfAssessmentModal({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const total = QUESTIONS.length;
  const isLast = step === total - 1;
  const current = QUESTIONS[step];
  const selected = answers[step];
  const answeredCount = Object.keys(answers).length;

  const handlePick = (optIdx: number) => setAnswers((prev) => ({ ...prev, [step]: optIdx }));

  const handleNext = () => {
    if (selected === undefined) return;
    if (isLast) {
      setFinished(true);
      onComplete();
      return;
    }
    setStep((s) => s + 1);
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      // Reset for next time only if the user hasn't finished
      if (!finished) {
        setStep(0);
        setAnswers({});
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg text-left">
        {!finished ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-brand-orange mb-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Self-Assessment</span>
              </div>
              <DialogTitle>Tell us a little about you</DialogTitle>
              <DialogDescription>
                There are no wrong answers! Just pick what feels right — this helps Veda and your mentor help you better.
              </DialogDescription>
            </DialogHeader>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-orange rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / total) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-text-muted shrink-0">
                Question {step + 1} of {total}
              </span>
            </div>

            {/* Question */}
            <div>
              <h4 className="font-bold text-sm text-text-heading mb-3">{current.q}</h4>
              <div className="space-y-2">
                {current.options.map((opt, idx) => {
                  const active = selected === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePick(idx)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-2.5",
                        active
                          ? "border-brand-orange bg-orange-50/60 text-text-heading"
                          : "border-slate-150 bg-white hover:border-slate-300 text-text-body",
                      )}
                    >
                      <span
                        className={cn(
                          "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                          active ? "border-brand-orange bg-brand-orange text-white" : "border-slate-300",
                        )}
                      >
                        {active && <CheckCircle2 className="h-3 w-3" />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className={cn(
                  "flex items-center gap-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
                  step === 0
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-text-heading hover:bg-slate-50 cursor-pointer",
                )}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={selected === undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-sm",
                  selected === undefined
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-brand-orange text-white hover:bg-orange-600 cursor-pointer",
                )}
              >
                {isLast ? "Finish & Unlock" : "Next"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
              <PartyPopper className="h-7 w-7" />
            </div>
            <DialogTitle className="text-center">All done! Your dashboard is unlocked 🎉</DialogTitle>
            <DialogDescription className="text-center mt-1.5">
              Great job! Veda now knows how you learn best. Your Vedhkrit Index and every feature are ready for you.
            </DialogDescription>
            <button
              onClick={() => handleClose(false)}
              className="mt-5 w-full rounded-xl bg-brand-blue text-white hover:bg-brand-navy py-2.5 text-xs font-bold transition-all cursor-pointer"
            >
              Explore My Dashboard
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
