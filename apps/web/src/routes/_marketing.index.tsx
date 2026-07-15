import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import {
  ArrowRight, Play, Sparkles, Users, Lightbulb, GraduationCap, MapPin, Award,
  CheckCircle2, Cpu, Rocket, Gamepad2, Leaf, Bot, Briefcase, Brain,
  BarChart3, Compass, UsersRound, Check, ChevronRight
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export const Route = createFileRoute("/_marketing/")({
  component: HomePage,
  head: () => ({
    meta: [{ title: "VEDHKRIT — Discover Potential. Develop Skills. Design Your Future." }],
  }),
});

const journey = [
  { icon: SearchIcon, label: "Discover", action: "Identify", desc: "AI assessment reveals true potential", bubbleColor: "bg-blue-500/10 text-blue-600 border-blue-500/25", hoverBorder: "hover:border-blue-400/50 hover:shadow-blue-500/10" },
  { icon: BookIcon, label: "Understand", action: "Analyze", desc: "Get personalized insights & reports", bubbleColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/25", hoverBorder: "hover:border-indigo-400/50 hover:shadow-indigo-500/10" },
  { icon: TrendingIcon, label: "Improve", action: "Optimize", desc: "1:1 mentoring & smart learning plan", bubbleColor: "bg-purple-500/10 text-purple-600 border-purple-500/25", hoverBorder: "hover:border-purple-400/50 hover:shadow-purple-500/10" },
  { icon: TargetIcon, label: "Practice", action: "Excel", desc: "Academic excellence with regular practice", bubbleColor: "bg-orange-500/10 text-orange-600 border-orange-500/25", hoverBorder: "hover:border-orange-400/50 hover:shadow-orange-500/10" },
  { icon: GraduationCap, label: "Experience", action: "Apply", desc: "Hands-on learning in Growth Studio (SLEC)", bubbleColor: "bg-teal-500/10 text-teal-600 border-teal-500/25", hoverBorder: "hover:border-teal-400/50 hover:shadow-teal-500/10" },
  { icon: MapPin, label: "Master", action: "Develop", desc: "Build skills, confidence and expertise", bubbleColor: "bg-blue-600/10 text-blue-700 border-blue-600/25", hoverBorder: "hover:border-blue-500/50 hover:shadow-blue-600/10" },
  { icon: Award, label: "Lead", action: "Succeed", desc: "Future ready for any career path", bubbleColor: "bg-teal-600/10 text-teal-700 border-teal-600/25", hoverBorder: "hover:border-teal-500/50 hover:shadow-teal-600/10" },
];

const twinFeatures = [
  "Academic & Cognitive Analysis",
  "Personality & Behaviour Insights",
  "Learning Style Detection",
  "Aptitude & Interest Mapping",
  "Continuous Growth Tracking",
];

const snapshot = [
  { icon: Brain, label: "Learning Style", value: "Visual Learner", textColor: "text-purple-500", bgColor: "bg-purple-50", borderColor: "border-purple-200", hoverBg: "hover:bg-purple-100" },
  { icon: Sparkles, label: "Top Strength", value: "Logical Thinking", textColor: "text-teal-500", bgColor: "bg-teal-50", borderColor: "border-teal-200", hoverBg: "hover:bg-teal-100" },
  { icon: TargetIcon, label: "Growth Area", value: "Public Speaking", textColor: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-200", hoverBg: "hover:bg-orange-100" },
  { icon: Cpu, label: "Career Interest", value: "AI & Technology", textColor: "text-blue-500", bgColor: "bg-blue-50", borderColor: "border-blue-200", hoverBg: "hover:bg-blue-100" },
];

const slecCards = [
  { title: "Smart Learning Studio", img: "/assets/images/slec-smart.jpg" },
  { title: "Innovation & Maker Lab", img: "/assets/images/slec-maker.jpg" },
  { title: "Career Counselling Lounge", img: "/assets/images/slec-career.jpg" },
  { title: "Knowledge Hub", img: "/assets/images/slec-knowledge.jpg" },
  { title: "AI & Tech Skills", img: "/assets/images/slec-aitech.jpg" },
  { title: "Global Studies", img: "/assets/images/slec-global.jpg" },
];

const paths = [
  { icon: Cpu, label: "AI Engineer", textColor: "text-cyan-400", borderColor: "border-cyan-500/30", bgColor: "bg-cyan-500/5", hoverBorder: "group-hover:border-cyan-400", hoverBg: "group-hover:bg-cyan-500/15" },
  { icon: Rocket, label: "Space Scientist", textColor: "text-indigo-400", borderColor: "border-indigo-500/30", bgColor: "bg-indigo-500/5", hoverBorder: "group-hover:border-indigo-400", hoverBg: "group-hover:bg-indigo-500/15" },
  { icon: Gamepad2, label: "Game Designer", textColor: "text-orange-400", borderColor: "border-orange-500/30", bgColor: "bg-orange-500/5", hoverBorder: "group-hover:border-orange-400", hoverBg: "group-hover:bg-orange-500/15" },
  { icon: Leaf, label: "Climate Innovator", textColor: "text-teal-400", borderColor: "border-teal-500/30", bgColor: "bg-teal-500/5", hoverBorder: "group-hover:border-teal-400", hoverBg: "group-hover:bg-teal-500/15" },
  { icon: Bot, label: "Robotics Expert", textColor: "text-cyan-400", borderColor: "border-cyan-500/30", bgColor: "bg-cyan-500/5", hoverBorder: "group-hover:border-cyan-400", hoverBg: "group-hover:bg-cyan-500/15" },
  { icon: Briefcase, label: "Entrepreneur", textColor: "text-purple-400", borderColor: "border-purple-500/30", bgColor: "bg-purple-500/5", hoverBorder: "group-hover:border-purple-400", hoverBg: "group-hover:bg-purple-500/15" },
  { icon: Brain, label: "Psychologist", textColor: "text-pink-400", borderColor: "border-pink-500/30", bgColor: "bg-pink-500/5", hoverBorder: "group-hover:border-pink-400", hoverBg: "group-hover:bg-pink-500/15" },
  { icon: BarChart3, label: "Data Scientist", textColor: "text-violet-400", borderColor: "border-violet-500/30", bgColor: "bg-violet-500/5", hoverBorder: "group-hover:border-violet-400", hoverBg: "group-hover:bg-violet-500/15" },
  { icon: Compass, label: "Architect", textColor: "text-amber-400", borderColor: "border-amber-500/30", bgColor: "bg-amber-500/5", hoverBorder: "group-hover:border-amber-400", hoverBg: "group-hover:bg-amber-500/15" },
  { icon: UsersRound, label: "Diplomat", textColor: "text-emerald-400", borderColor: "border-emerald-500/30", bgColor: "bg-emerald-500/5", hoverBorder: "group-hover:border-emerald-400", hoverBg: "group-hover:bg-emerald-500/15" },
];

const parentFeatures = [
  "Real-time Progress Tracking",
  "Mentor Feedback & Notes",
  "Monthly Growth Reports",
  "AI Recommendations",
  "Safe & Trusted Environment",
];

// SVG Helper Components to avoid complex dependencies
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.168.477-4 1.253" />
    </svg>
  );
}

// Trending icon outline
function TrendingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16zm0-4a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  );
}

const decoratorIcons = [
  // Section 1
  { Icon: Cpu, top: "2%", left: "4%", rotate: "-15deg", color: "text-brand-blue", size: "h-10 w-10" },
  { Icon: Cpu, top: "3%", left: "12%", rotate: "-12deg", color: "text-brand-blue", size: "h-10 w-10" },
  { Icon: Rocket, top: "5%", right: "6%", rotate: "25deg", color: "text-brand-orange", size: "h-11 w-11" },
  { Icon: Brain, top: "8%", left: "45%", rotate: "-10deg", color: "text-brand-teal", size: "h-12 w-12" },
  { Icon: Sparkles, top: "11%", right: "42%", rotate: "15deg", color: "text-brand-purple", size: "h-10 w-10" },
  { Icon: Lightbulb, top: "14%", left: "8%", rotate: "40deg", color: "text-brand-blue", size: "h-11 w-11" },
  { Icon: Bot, top: "17%", right: "12%", rotate: "-20deg", color: "text-brand-orange", size: "h-10 w-10" },
  { Icon: Lightbulb, top: "20%", left: "32%", rotate: "10deg", color: "text-brand-blue", size: "h-10 w-10" },
  
  // Section 2
  { Icon: Compass, top: "23%", left: "50%", rotate: "30deg", color: "text-brand-teal", size: "h-11 w-11" },
  { Icon: GraduationCap, top: "26%", left: "12%", rotate: "-15deg", color: "text-brand-purple", size: "h-10 w-10" },
  { Icon: Award, top: "29%", right: "15%", rotate: "18deg", color: "text-brand-blue", size: "h-11 w-11" },
  { Icon: Gamepad2, top: "32%", left: "45%", rotate: "-25deg", color: "text-brand-orange", size: "h-10 w-10" },
  { Icon: Leaf, top: "35%", right: "8%", rotate: "12deg", color: "text-brand-teal", size: "h-12 w-12" },
  { Icon: Briefcase, top: "38%", left: "7%", rotate: "-10deg", color: "text-brand-purple", size: "h-11 w-11" },
  { Icon: Sparkles, top: "40%", right: "30%", rotate: "35deg", color: "text-brand-purple", size: "h-10 w-10" },

  // Section 3
  { Icon: Cpu, top: "43%", right: "45%", rotate: "35deg", color: "text-brand-blue", size: "h-10 w-10" },
  { Icon: Rocket, top: "46%", left: "42%", rotate: "-15deg", color: "text-brand-orange", size: "h-11 w-11" },
  { Icon: Brain, top: "49%", left: "15%", rotate: "20deg", color: "text-brand-teal", size: "h-12 w-12" },
  { Icon: Sparkles, top: "52%", right: "20%", rotate: "-30deg", color: "text-brand-purple", size: "h-10 w-10" },
  { Icon: Lightbulb, top: "55%", left: "48%", rotate: "10deg", color: "text-brand-blue", size: "h-11 w-11" },
  { Icon: Bot, top: "58%", right: "10%", rotate: "-15deg", color: "text-brand-orange", size: "h-10 w-10" },
  { Icon: Award, top: "60%", left: "28%", rotate: "12deg", color: "text-brand-blue", size: "h-11 w-11" },

  // Section 4
  { Icon: Compass, top: "63%", left: "8%", rotate: "25deg", color: "text-brand-teal", size: "h-11 w-11" },
  { Icon: GraduationCap, top: "66%", right: "45%", rotate: "-20deg", color: "text-brand-purple", size: "h-10 w-10" },
  { Icon: Award, top: "69%", left: "52%", rotate: "15deg", color: "text-brand-blue", size: "h-11 w-11" },
  { Icon: Gamepad2, top: "72%", right: "8%", rotate: "-10deg", color: "text-brand-orange", size: "h-10 w-10" },
  { Icon: Leaf, top: "75%", left: "14%", rotate: "30deg", color: "text-brand-teal", size: "h-12 w-12" },
  { Icon: Briefcase, top: "78%", right: "15%", rotate: "-22deg", color: "text-brand-purple", size: "h-11 w-11" },
  { Icon: Brain, top: "80%", left: "30%", rotate: "-10deg", color: "text-brand-teal", size: "h-11 w-11" },

  // Section 5
  { Icon: Cpu, top: "82%", left: "48%", rotate: "15deg", color: "text-brand-blue", size: "h-10 w-10" },
  { Icon: Rocket, top: "85%", left: "10%", rotate: "-25deg", color: "text-brand-orange", size: "h-11 w-11" },
  { Icon: Brain, top: "88%", right: "12%", rotate: "20deg", color: "text-brand-teal", size: "h-12 w-12" },
  { Icon: Sparkles, top: "91%", left: "40%", rotate: "-10deg", color: "text-brand-purple", size: "h-10 w-10" },
  { Icon: Lightbulb, top: "94%", right: "50%", rotate: "30deg", color: "text-brand-blue", size: "h-11 w-11" },
  { Icon: Bot, top: "96%", left: "5%", rotate: "-18deg", color: "text-brand-orange", size: "h-10 w-10" },
  { Icon: Compass, top: "98%", right: "6%", rotate: "12deg", color: "text-brand-teal", size: "h-11 w-11" },
];

function TechBackgroundDecorator() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.14] sm:opacity-[0.17]">
      {decoratorIcons.map((item, idx) => {
        const style: React.CSSProperties = {
          position: "absolute",
          top: item.top,
          left: item.left || undefined,
          right: item.right || undefined,
          transform: `rotate(${item.rotate})`,
        };
        return (
          <item.Icon
            key={idx}
            style={style}
            className={`${item.size} ${item.color} stroke-[1]`}
          />
        );
      })}
    </div>
  );
}

// Preloader Loading Screen Component
function Preloader() {
  const preloaderIcons = [
    { Icon: Cpu, top: "10%", left: "12%", color: "text-brand-blue" },
    { Icon: Brain, top: "15%", right: "12%", color: "text-brand-teal" },
    { Icon: Rocket, top: "35%", left: "8%", color: "text-brand-orange" },
    { Icon: Bot, top: "40%", right: "8%", color: "text-brand-orange" },
    { Icon: Lightbulb, top: "60%", left: "10%", color: "text-brand-blue" },
    { Icon: Compass, top: "65%", right: "10%", color: "text-brand-teal" },
    { Icon: Sparkles, top: "80%", left: "15%", color: "text-brand-purple" },
    { Icon: GraduationCap, top: "85%", right: "15%", color: "text-brand-purple" },
    { Icon: Award, top: "25%", left: "80%", color: "text-brand-blue" },
    { Icon: Leaf, top: "30%", left: "20%", color: "text-brand-teal" },
    { Icon: Briefcase, top: "70%", left: "75%", color: "text-brand-purple" },
    { Icon: Gamepad2, top: "50%", left: "45%", color: "text-brand-orange" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary overflow-hidden select-none">
      
      {/* Properly visible scattered backdrop illustrations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {preloaderIcons.map((item, idx) => (
          <motion.div
            key={idx}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left || "auto",
              right: item.right || "auto",
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 5 + (idx % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.2,
            }}
            className={`opacity-[0.16] hover:opacity-30 transition-opacity duration-300 ${item.color}`}
          >
            <item.Icon className="h-10 w-10 stroke-[1.25]" />
          </motion.div>
        ))}
      </div>

      {/* Center circular loader and logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center h-44 w-44 mb-6">
          {/* Glowing backdrop halo */}
          <div className="absolute h-28 w-28 rounded-full bg-brand-blue/10 animate-pulse blur-xl" />
          
          {/* Orbiting Ring 1 (Clockwise) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            className="absolute h-32 w-32 rounded-full border-2 border-t-brand-orange border-r-brand-teal border-b-transparent border-l-transparent"
          />
          
          {/* Orbiting Ring 2 (Counter-Clockwise) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            className="absolute h-38 w-38 rounded-full border-2 border-t-transparent border-r-transparent border-b-brand-teal border-l-brand-orange"
          />
          
          {/* Logo center container */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [1, 1.03, 1], opacity: 1 }}
            transition={{ 
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.8 }
            }}
            className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl p-3 border border-slate-100/50"
          >
            <img
              src="/assets/brand/veda-logo.png"
              alt="Veda Brand Logo"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
        
        {/* Animated Brand Titles */}
        <h3 className="text-sm font-black tracking-[0.25em] text-brand-navy uppercase">
          VEDHKRIT
        </h3>
        <p className="mt-1 text-[10px] text-brand-teal font-extrabold tracking-wider">
          DISCOVER • DEVELOP • DESIGN
        </p>
  
        {/* Sleek loading progress bar */}
        <div className="mt-6 h-[4px] w-36 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.0, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-orange"
          />
        </div>
      </div>
    </div>
  );
}

const heroSlides = [
  {
    badge: "Career Guidance & Assessment",
    line1: "Assess. Learn. Grow with",
    desc: "Vedhkrit helps students unlock their strengths, make informed career choices, and build a future they truly deserve."
  },
  {
    badge: "Parenting & Family Support",
    line1: "Empower. Guide. Succeed with",
    desc: "Partner with us to map your child's academic journey, discover their hidden potential, and shape their success."
  }
];

let hasLoaded = false;
function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      (window as any).__vedhkrit_loading = true;
      window.dispatchEvent(new Event("vedhkrit-loading-change"));
    }
    const timer = setTimeout(() => {
      setLoading(false);
      hasLoaded = true;
      if (typeof window !== "undefined") {
        (window as any).__vedhkrit_loading = false;
        window.dispatchEvent(new Event("vedhkrit-loading-change"));
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        (window as any).__vedhkrit_loading = false;
        window.dispatchEvent(new Event("vedhkrit-loading-change"));
      }
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="relative bg-bg-primary text-text-body font-sans antialiased overflow-x-hidden">
      {/* 1. DESKTOP HERO SECTION (Light-themed matching reference image with bottom-left quadrant alignment) */}
      <section className="hidden lg:flex relative border-b border-slate-100 h-dvh items-center overflow-hidden bg-white z-10">
        
        {/* Full-bleed Background Image with transitions */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeBanner}
              src={activeBanner === 0 ? "/assets/images/desktop-hero-bg.png" : "/assets/images/desktop-hero-bg-2.png"}
              alt="Vedhkrit Desktop Background"
              className="absolute inset-0 w-full h-full object-cover object-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* Content Container (aligned to bottom-left quadrant, styled to one-third rule width) */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-end pb-16 lg:pb-20 pt-28">
          <div className="w-full lg:max-w-[34%] xl:max-w-[32%] text-left flex flex-col justify-end items-start mb-4">
            
            {/* Dynamic branded pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full bg-brand-blue/8 border border-brand-blue/15 relative z-30"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-[11px] font-bold text-brand-blue uppercase tracking-widest">{heroSlides[activeBanner].badge}</span>
            </motion.div>

            {/* Heading with left accent bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-stretch gap-4 relative z-30"
            >
              {/* Gradient left accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ originY: 1 }}
                className="w-1 rounded-full bg-gradient-to-b from-brand-blue via-brand-teal to-brand-orange shrink-0"
              />
              <h1 className="flex flex-col items-start leading-tight">
                <span className="text-sm lg:text-base font-bold text-slate-500 uppercase tracking-widest">
                  {heroSlides[activeBanner].line1}
                </span>
                <span className="text-5xl lg:text-6xl font-black mt-2 text-brand-blue">
                  Vedhkrit
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-5 text-sm lg:text-base text-slate-600 font-semibold leading-relaxed max-w-lg relative z-30"
            >
              {heroSlides[activeBanner].desc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-4 mt-8 relative z-30"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue hover:bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all shadow-md shadow-brand-blue/15 hover:-translate-y-0.5 active:scale-95"
              >
                Get Started <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 px-6 py-3 text-sm font-bold text-brand-blue transition-all shadow-xs hover:-translate-y-0.5 active:scale-95"
              >
                <Play className="h-4 w-4 fill-brand-blue text-brand-blue shrink-0" /> Watch How It Works
              </Link>
            </motion.div>

            {/* Banner Switching Dots directly under content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-2 mt-8 relative z-30"
            >
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`transition-all duration-300 rounded-full h-2 ${
                    activeBanner === i ? "w-6 bg-brand-orange" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 1. MOBILE HERO SECTION (Light-themed matching reference image) */}
      <section className="lg:hidden relative h-dvh min-h-[600px] w-full overflow-hidden z-10 border-b border-slate-100 bg-white">
        
        {/* Full-bleed Background Image with transitions */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeBanner}
              src={activeBanner === 0 ? "/assets/images/mobile-hero-bg.png" : "/assets/images/mobile-hero-bg-2.png"}
              alt="Vedhkrit Mobile Background"
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          {/* Top gradient overlay for text readability */}
          <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white via-white/95 to-transparent z-10" />
          {/* Bottom gradient for CTA */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white via-white/90 to-transparent z-10" />
        </div>

        {/* Content Wrapper */}
        <div className="mx-auto w-full max-w-sm h-full flex flex-col justify-between pt-28 pb-8 relative z-20 text-center px-5">
          
          {/* Top Group: Text with proper dark colors */}
          <div className="flex flex-col items-center">
            {/* Branded pill badge */}
            <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-brand-blue/8 border border-brand-blue/15">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-[9px] font-bold text-brand-blue uppercase tracking-widest">{heroSlides[activeBanner].badge}</span>
            </div>

            {/* Heading - dark text for visibility */}
            <h1 className="flex flex-col items-center leading-tight">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">
                {heroSlides[activeBanner].line1}
              </span>
              <span className="text-[2rem] sm:text-4xl font-black tracking-tight mt-1 text-brand-blue">
                Vedhkrit
              </span>
            </h1>

            {/* Description - dark text */}
            <p className="mt-3 text-slate-500 text-[11px] sm:text-xs leading-relaxed font-semibold max-w-[280px]">
              {heroSlides[activeBanner].desc}
            </p>

            {/* Banner Dots */}
            <div className="flex items-center justify-center gap-2 mt-4 relative z-30">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`transition-all duration-300 rounded-full h-1.5 ${
                    activeBanner === i ? "w-5 bg-brand-orange" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Group: Buttons */}
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue hover:bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-brand-blue/15"
              >
                Get Started <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 px-5 py-2.5 text-xs font-bold text-brand-blue transition-all shadow-xs"
              >
                <Play className="h-3.5 w-3.5 fill-brand-blue text-brand-blue shrink-0" /> Watch How It Works
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Vector Illustrations background applied below Hero Section */}
      <div className="relative overflow-x-hidden home-sections-scaled">
        <TechBackgroundDecorator />

        {/* 2. THE VEDHKRIT JOURNEY */}
        <section className="relative py-8 sm:py-10 overflow-hidden border-b border-border-default/50 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">— The Learning Cycle —</span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-heading mt-1">The Student Growth Journey</h2>
              <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">Our structured 7-step path maps and transforms capabilities from potential to leadership.</p>
            </FadeIn>

            {/* Desktop Layout (Horizontal timeline) */}
            <div className="relative mt-10 hidden md:block">
              {/* Desktop background connecting line */}
              <div className="absolute top-[44px] left-[6%] right-[6%] h-1 bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 via-orange-500 via-teal-500 via-blue-600 to-teal-600 z-0 rounded-full opacity-50 shadow-[0_0_8px_rgba(59,130,246,0.2)]" />
              
              <div className="relative z-10 grid grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
                {journey.map((step, i) => (
                  <div
                    key={step.label}
                    className={`flex flex-col items-center text-center bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer relative z-10 ${step.hoverBorder} hover:-translate-y-2 hover:shadow-lg`}
                  >
                    {/* Step Milestone Bubble */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-sm shrink-0 mb-3 ${step.bubbleColor}`}>
                      <step.icon className="h-5 w-5 text-current" />
                    </div>

                    {/* Action Tag Badge */}
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md mb-2 ${step.bubbleColor}`}>
                      {step.action}
                    </span>

                    {/* Step Label */}
                    <div className="font-extrabold text-sm text-text-heading group-hover:text-brand-blue transition-colors leading-tight">
                      {step.label}
                    </div>

                    {/* Description */}
                    <p className="text-[10px] text-text-muted mt-2 leading-relaxed px-0.5 font-medium">
                      {step.desc}
                    </p>

                    {/* Gutter Arrow Connector */}
                    {i < journey.length - 1 && (
                      <div className="absolute -right-3.5 top-[32px] z-20 flex items-center justify-center bg-white border border-slate-100 rounded-full p-1.5 shadow-sm text-brand-teal animate-pulse">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout (Vertical timeline) */}
            <div className="relative mt-8 md:hidden px-2">
              {/* Vertical line running down */}
              <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 via-purple-500 via-orange-500 via-teal-500 via-blue-600 to-teal-600 opacity-30 rounded-full" />
              
              <div className="space-y-4">
                {journey.map((step, i) => (
                  <div key={step.label} className="relative flex gap-4 pl-10 items-start">
                    {/* Step bubble milestone on line */}
                    <div className={`absolute left-2 top-0 w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 border-white shadow-md z-10 ${step.bubbleColor} shrink-0`}>
                      <step.icon className="h-4 w-4 text-current" />
                    </div>
                    {/* Content Card */}
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 shadow-xs text-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[8px] font-black tracking-widest uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          0{i + 1}
                        </span>
                        <span className={`text-[8.5px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded ${step.bubbleColor}`}>
                          {step.action}
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-text-heading leading-tight">
                        {step.label}
                      </div>
                      <p className="text-[10px] text-text-muted mt-1 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. FOCUS CORE: FOR STUDENTS & PARENTS ROLE BLOCK */}
        <section className="relative py-10 sm:py-14 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-8 sm:mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/8 border border-brand-teal/20 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                <span className="h-1 w-4 rounded-full bg-brand-teal" /> Tailored Ecosystem <span className="h-1 w-4 rounded-full bg-brand-teal" />
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-heading mt-3">Built for Every Learner in the Family</h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-lg mx-auto leading-relaxed">One platform connecting students and parents with real insights, mentors, and personalized growth paths.</p>
            </FadeIn>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">

              {/* ── STUDENT CARD ── */}
              <FadeIn delay={0.1} x={-20} y={0}>
                <div className="group rounded-2xl overflow-hidden border border-brand-blue/20 bg-white hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-500 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Left visual panel — real student photo, tablet/desktop only */}
                    <div className="hidden sm:flex sm:w-40 lg:w-48 shrink-0 flex-col items-center justify-end p-5 gap-3 relative overflow-hidden">
                      <img src="/assets/images/student-verve.png" alt="Student" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/85 via-brand-blue/25 to-transparent" />
                      <div className="relative z-10 text-center">
                        <div className="h-11 w-11 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center mx-auto mb-2">
                          <GraduationCap className="h-5.5 w-5.5 text-white" />
                        </div>
                        <div className="text-white text-[9px] font-bold uppercase tracking-widest drop-shadow">For Students</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col">
                      <div className="flex sm:hidden items-center gap-2 mb-2.5">
                        <div className="h-7 w-7 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                          <GraduationCap className="h-3.5 w-3.5 text-brand-blue" />
                        </div>
                        <span className="text-[9px] font-extrabold text-brand-blue uppercase tracking-widest bg-brand-blue/8 px-2 py-0.5 rounded-full border border-brand-blue/15">For Students</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">Unlock Your True Potential</h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed flex-1">
                        Discover your strengths, understand how you learn, build an active digital portfolio, and connect with mentors toward your future identity.
                      </p>
                      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5">
                        {["AI Aptitude Test", "Career Roadmap", "Skill Portfolio", "1:1 Mentoring"].map(f => (
                          <span key={f} className="text-[9px] sm:text-[10px] font-semibold text-brand-blue bg-brand-blue/6 border border-brand-blue/12 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                      <Link to="/register" className="mt-3 self-start inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-blue hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-blue/20 hover:-translate-y-0.5 active:scale-95">
                        Begin Aptitude Discovery <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                  {/* Bottom stats bar — matches parent card */}
                  <div className="grid grid-cols-3 divide-x divide-brand-blue/10 border-t border-brand-blue/10 bg-slate-50/80">
                    {[
                      { v: "+31%", l: "Score Lift", c: "text-brand-blue" },
                      { v: "50+", l: "Career Paths", c: "text-brand-teal" },
                      { v: "∞", l: "Mentoring", c: "text-blue-500" },
                    ].map(s => (
                      <div key={s.l} className="py-2.5 sm:py-3 px-1 text-center">
                        <div className={`text-base sm:text-lg font-black ${s.c} leading-none`}>{s.v}</div>
                        <div className="text-[8px] sm:text-[9px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide leading-tight">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* ── PARENT CARD ── */}
              <FadeIn delay={0.2} x={20} y={0}>
                <div className="group rounded-2xl overflow-hidden border border-brand-orange/20 bg-white hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-500 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Left visual panel — real family photo, tablet/desktop only */}
                    <div className="hidden sm:flex sm:w-40 lg:w-48 shrink-0 flex-col items-center justify-end p-5 gap-3 relative overflow-hidden">
                      <img src="/assets/images/parents-family.jpg" alt="Parents" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/85 via-brand-orange/25 to-transparent" />
                      <div className="relative z-10 text-center">
                        <div className="h-11 w-11 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center mx-auto mb-2">
                          <Users className="h-5.5 w-5.5 text-white" />
                        </div>
                        <div className="text-white text-[9px] font-bold uppercase tracking-widest drop-shadow">For Parents</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col">
                      <div className="flex sm:hidden items-center gap-2 mb-2.5">
                        <div className="h-7 w-7 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                          <Users className="h-3.5 w-3.5 text-brand-orange" />
                        </div>
                        <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-widest bg-brand-orange/8 px-2 py-0.5 rounded-full border border-brand-orange/15">For Parents</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">Always Informed. Always Involved.</h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed flex-1">
                        Stay updated with deep insights into your child's growth. Track progress, receive recommendations, and review mentor feedback in real time.
                      </p>
                      <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1.5">
                        {["Live Reports", "Mentor Feedback", "Growth Alerts", "Safe Space"].map(f => (
                          <div key={f} className="flex items-center gap-1.5">
                            <span className="h-3.5 w-3.5 rounded-full bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center shrink-0">
                              <Check className="h-2 w-2 text-brand-orange" />
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/register" className="mt-3 self-start inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-orange hover:bg-orange-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-orange/20 hover:-translate-y-0.5 active:scale-95">
                        Access Parent Dashboard <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                  {/* Bottom stats bar — matches student card */}
                  <div className="grid grid-cols-3 divide-x divide-brand-orange/10 border-t border-brand-orange/10 bg-slate-50/80">
                    {[
                      { v: "97%", l: "Satisfaction", c: "text-brand-orange" },
                      { v: "Live", l: "Daily Reports", c: "text-orange-500" },
                      { v: "10K+", l: "Families", c: "text-amber-500" },
                    ].map(s => (
                      <div key={s.l} className="py-2.5 sm:py-3 px-1 text-center">
                        <div className={`text-base sm:text-lg font-black ${s.c} leading-none`}>{s.v}</div>
                        <div className="text-[8px] sm:text-[9px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide leading-tight">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. DIGITAL TWIN & SNAPSHOT */}
        <FadeIn>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-5">

            {/* ── DIGITAL TWIN: dark left panel + white right panel ── */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Left light accent strip */}
                <div className="sm:w-40 lg:w-44 shrink-0 bg-gradient-to-b from-teal-50 via-white to-blue-50 border-r border-slate-100 flex flex-col items-center justify-center p-5 gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(4,136,162,0.12) 0%, transparent 70%)'}} />
                  <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                    <div className="h-14 w-14 rounded-2xl bg-brand-teal/10 border border-brand-teal/25 flex items-center justify-center">
                      <Bot className="h-7 w-7 text-brand-teal" />
                    </div>
                    <div className="text-center">
                      <div className="text-[9px] text-brand-teal font-extrabold uppercase tracking-widest">AI Insight</div>
                      <div className="text-slate-700 text-xs font-bold mt-0.5 leading-tight">Digital<br/>Learning Twin</div>
                    </div>
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-brand-teal/40 shadow-md">
                      <img src="/assets/images/digital-twin.jpg" alt="Digital Learning Twin" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] text-slate-400 font-medium leading-tight">Personalised<br/>just for you</div>
                    </div>
                  </div>
                </div>
                {/* Right white content */}
                <div className="flex-1 bg-white p-5 sm:p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">Meet Your Digital Learning Twin</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    Our AI Discovery Engine™ maps cognitive abilities, motivation types, and learning styles to track your growth continuously.
                  </p>
                  <div className="mt-4 space-y-2 flex-1">
                    {twinFeatures.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <div className="h-5 w-5 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-3 w-3 text-brand-teal" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/register" className="mt-4 self-start inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-teal hover:bg-teal-600 px-4 py-2.5 rounded-xl transition-all shadow-sm">
                    Try It Free <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── RADAR: clean light card, radar top on mobile, side-by-side on desktop ── */}
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm relative">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <svg className="hidden">
                <defs>
                  <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0488A2" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="p-5 sm:p-6 relative z-10 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-xl bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-brand-teal" />
                  </div>
                  <div>
                    <div className="text-[9px] font-extrabold text-brand-teal uppercase tracking-widest">Cognitive Radar</div>
                    <div className="text-slate-800 font-bold text-sm leading-tight">Your Growth Snapshot</div>
                  </div>
                </div>

                {/* Radar + metrics: stacked on mobile, side-by-side on sm+ */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Radar SVG */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0 mx-auto sm:mx-0">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <polygon points="100,20 175,70 150,160 50,160 25,70" fill="none" stroke="rgba(15,23,42,0.12)" strokeWidth="1" />
                      <polygon points="100,50 150,85 133,140 67,140 50,85" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
                      <motion.polygon
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
                        points="100,55 155,85 140,150 65,145 45,85"
                        fill="url(#radarGrad)"
                        stroke="#0488A2"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="55" r="3.5" fill="#60a5fa" />
                      <circle cx="155" cy="85" r="3.5" fill="#c084fc" />
                      <circle cx="140" cy="150" r="3.5" fill="#fb923c" />
                      <circle cx="65" cy="145" r="3.5" fill="#2dd4bf" />
                      <circle cx="45" cy="85" r="3.5" fill="#fbbf24" />
                      <text x="100" y="13" fontSize="7.5" fill="#2563eb" fontWeight="700" textAnchor="middle">Academic 82</text>
                      <text x="186" y="68" fontSize="7.5" fill="#9333ea" fontWeight="700" textAnchor="middle">Comm 71</text>
                      <text x="160" y="174" fontSize="7.5" fill="#ea580c" fontWeight="700" textAnchor="middle">Leadership 64</text>
                      <text x="40" y="174" fontSize="7.5" fill="#0d9488" fontWeight="700" textAnchor="middle">Innovation 76</text>
                      <text x="14" y="68" fontSize="7.5" fill="#d97706" fontWeight="700" textAnchor="middle">Consistency 69</text>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-slate-800 leading-none">82</span>
                      <span className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">Index™</span>
                    </div>
                  </div>
                  {/* Metrics: 2-col grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 w-full sm:flex-1">
                    {snapshot.map((s) => (
                      <div key={s.label} className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${s.bgColor} ${s.borderColor}`}>
                        <s.icon className={`h-3.5 w-3.5 ${s.textColor} shrink-0`} />
                        <div className="min-w-0">
                          <div className="text-[8px] text-slate-400 font-medium leading-none">{s.label}</div>
                          <div className="text-[11px] font-bold text-slate-700 mt-0.5 leading-tight truncate">{s.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* CTA */}
                <Link to="/register" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-teal hover:bg-teal-600 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:-translate-y-0.5 active:scale-95 w-fit">
                  Take Free Assessment <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* 5. STUDENT LEARNING EXPERIENCE CENTRE (SLEC) */}
        <FadeIn>
        <section className="relative py-10 border-b border-border-default/50 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-bg-secondary/40 border border-border-default/50 p-5 md:p-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-default/40 pb-4 mb-6">
                <div className="max-w-2xl">
                  <span className="text-[9px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Physical Centers / Studio
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-text-heading mt-2">Student Learning Experience Centre (SLEC)</h3>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    Our state-of-the-art interactive hubs build creativity, digital skills, logical thinking, and peer collaboration.
                  </p>
                </div>
                <Link
                  to="/framework"
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-brand-blue text-white hover:bg-brand-navy transition shadow-sm"
                >
                  Explore SLEC Labs <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {slecCards.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-lg bg-card-default overflow-hidden shadow-sm border border-border-default/60 group cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-bg-secondary">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2 text-center text-[10px] font-bold text-text-heading leading-tight group-hover:text-brand-blue transition-colors">
                      {c.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* 6. FUTURE IDENTITY */}
        <FadeIn>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 z-10 relative">
          <div className="rounded-2xl bg-gradient-to-br from-[#031530] via-[#051c42] to-[#04122d] border border-white/10 p-7 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-brand-teal font-extrabold tracking-widest uppercase bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 rounded-full">
                    <span className="h-1 w-3 rounded-full bg-brand-teal animate-pulse" /> Explore. Experience. Evolve.
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white leading-tight">Your Future Identity Awaits</h3>
                  <p className="mt-1 text-xs text-white/50 font-medium">Choose from 40+ dynamic future identities curated for tomorrow's leaders</p>
                </div>
                <Link
                  to="/register"
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy bg-brand-teal hover:bg-teal-400 px-5 py-2.5 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  Explore All Paths <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-11 gap-2">
                {paths.map((p) => (
                  <div
                    key={p.label}
                    className={`group flex flex-col items-center text-center cursor-pointer rounded-2xl border p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${p.bgColor} ${p.borderColor} ${p.hoverBorder} ${p.hoverBg}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-2 bg-white/5 group-hover:bg-white/10 transition-colors">
                      <p.icon className={`h-5 w-5 ${p.textColor} group-hover:scale-110 transition-transform duration-200`} />
                    </div>
                    <span className="text-[9px] font-bold text-white/80 tracking-tight leading-tight group-hover:text-white transition-colors">
                      {p.label}
                    </span>
                  </div>
                ))}
                <Link
                  to="/register"
                  className="group flex flex-col items-center text-center cursor-pointer rounded-2xl border border-white/15 bg-white/5 hover:border-brand-teal/40 hover:bg-white/10 p-3 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-2 bg-white/5 group-hover:bg-white/10">
                    <span className="text-lg font-black text-brand-teal group-hover:text-brand-orange transition-colors">40+</span>
                  </div>
                  <span className="text-[9px] font-bold text-white/60 uppercase tracking-tighter leading-tight">More</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* 7. PARENTS DEDICATED SHOWCASE */}
        <FadeIn>
        <section id="parents" className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 z-10 relative">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="grid lg:grid-cols-12 bg-gradient-to-br from-[#031530] via-[#051c42] to-[#04122d] relative items-stretch overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 right-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Col 1: Text + features */}
              <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-center relative z-10">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-brand-orange uppercase tracking-widest bg-brand-orange/10 border border-brand-orange/20 px-3 py-1 rounded-full mb-5 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" /> For Parents
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Always Informed,<br />
                  <span className="text-brand-teal">Always Involved.</span>
                </h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  Keep updated with real-time insight into your child's capabilities. View mentor feedback and tracking summaries directly from your dashboard.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {parentFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-brand-teal" />
                      </span>
                      <span className="text-sm text-white/80 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-navy bg-brand-teal hover:bg-teal-400 px-6 py-3 rounded-xl transition-all shadow-lg w-fit hover:-translate-y-0.5 active:scale-95"
                >
                  Access Parent Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Col 2: Phone mockup */}
              <div className="lg:col-span-3 p-5 flex justify-center items-center relative z-10 lg:border-l lg:border-white/5 bg-black/10">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[220px] h-[420px] rounded-[2.5rem] bg-slate-950 border-[10px] border-slate-900 shadow-2xl relative overflow-hidden shrink-0 flex flex-col"
                >
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <span className="w-1 h-1 rounded-full bg-blue-900/60" />
                  </div>

                  {/* Status Bar */}
                  <div className="absolute top-1 left-0 right-0 px-6 flex justify-between items-center text-[9px] font-bold text-slate-700 z-20">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      {/* Signal */}
                      <svg className="w-2.5 h-2 text-slate-700" fill="currentColor" viewBox="0 0 16 16">
                        <rect x="1" y="8" width="1.5" height="4" rx="0.5" />
                        <rect x="3.5" y="6" width="1.5" height="6" rx="0.5" />
                        <rect x="6" y="4" width="1.5" height="8" rx="0.5" />
                        <rect x="8.5" y="2" width="1.5" height="10" rx="0.5" />
                      </svg>
                      {/* Wifi */}
                      <svg className="w-2.5 h-2 text-slate-700" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"/>
                      </svg>
                      {/* Battery */}
                      <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
                        <div className="w-2.5 h-full bg-slate-700 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* Device Screen */}
                  <div className="rounded-[2.1rem] bg-slate-50 text-slate-800 p-4 h-full flex flex-col pt-8 border border-slate-200 relative overflow-hidden flex-grow select-none">
                    
                    {/* Welcome Row */}
                    <div className="flex items-center justify-between mt-2 px-1">
                      <span className="text-[10px] font-bold text-slate-400">👋 Hello Parent</span>
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                        <Users className="w-3 h-3 text-slate-600" />
                      </div>
                    </div>

                    {/* Section Header */}
                    <div className="text-left mt-2 px-1">
                      <h4 className="text-sm font-black text-slate-800 leading-tight">My Child's Growth</h4>
                      <p className="text-[8px] text-slate-400 font-medium">Real-time learning metrics</p>
                    </div>

                    {/* VEDHKRIT INDEX Ring Card */}
                    <div className="bg-white rounded-2xl border border-slate-100/70 p-3 shadow-xs my-3 flex flex-col items-center">
                      <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100/50 shadow-inner">
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-[-90deg]">
                          <circle cx="50" cy="50" r="41" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                          <circle cx="50" cy="50" r="41" fill="none" stroke="url(#phoneRadarGrad)" strokeWidth="8" strokeDasharray="257" strokeDashoffset="46" strokeLinecap="round" />
                        </svg>
                        <defs>
                          <linearGradient id="phoneRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0488A2" />
                            <stop offset="100%" stopColor="#052261" />
                          </linearGradient>
                        </defs>
                        <div className="flex flex-col items-center relative z-10">
                          <div className="text-2xl font-black text-slate-800 leading-none">82</div>
                          <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Index</div>
                        </div>
                      </div>
                      <div className="text-[7.5px] text-slate-400 font-black uppercase tracking-widest mt-2 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/50">
                        VEDHKRIT INDEX™
                      </div>
                    </div>

                    {/* Two-column quick stats */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="bg-white rounded-xl p-2 border border-slate-100 text-left shadow-xs flex flex-col justify-between h-12">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide">Attendance</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="font-extrabold text-[#052261] text-sm leading-none mt-1">95%</div>
                      </div>
                      <div className="bg-white rounded-xl p-2 border border-slate-100 text-left shadow-xs flex flex-col justify-between h-12">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide">Progress</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        </div>
                        <div className="font-extrabold text-[#0488A2] text-xs leading-none mt-1">On Track</div>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="mt-auto w-full text-[9px] py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue hover:opacity-95 text-white font-extrabold uppercase tracking-wider shadow-sm transition-opacity">
                      View Full Dashboard
                    </button>

                  </div>

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/40 rounded-full z-30" />
                </motion.div>
              </div>

              {/* Col 3: Testimonial with photo */}
              <div className="lg:col-span-4 relative z-10 lg:border-l lg:border-white/5 overflow-hidden flex flex-col justify-end min-h-[260px] lg:min-h-0 group">
                <img
                  src="/assets/images/parents-family.jpg"
                  alt="Parents and Family"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
                <div className="relative z-20 p-7">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <div className="text-2xl text-brand-teal font-serif leading-none select-none mb-2">"</div>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    Vedhkrit has helped my daughter discover her strengths and build coding portfolios she never thought she could construct.
                  </p>
                  <div className="text-right text-2xl text-brand-teal font-serif leading-none select-none -mt-1">"</div>
                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/10">
                    <img src="/assets/images/parent-avatar.jpg" alt="Priya Sharma" className="h-9 w-9 rounded-full object-cover border-2 border-brand-teal/40" loading="lazy" />
                    <div>
                      <div className="text-sm font-bold text-white leading-none">Priya Sharma</div>
                      <div className="text-[10px] text-white/50 mt-0.5">Parent of Grade 9 Learner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* 8. READY TO DESIGN YOUR FUTURE (App-Ready Final CTA) */}
        <FadeIn>
        <section className="py-12 bg-gradient-to-br from-[#031530] via-[#052261] to-[#04122d] text-white relative overflow-hidden z-10 border-t border-white/10">
          
          {/* Background image covering full screen on mobile, right 2/3rds on desktop */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/final-cta-v2.png"
              alt="Student Success CTA Backdrop"
              className="absolute inset-y-0 right-0 w-full lg:w-2/3 h-full object-cover object-right lg:object-top opacity-90 lg:opacity-100"
              loading="eager"
            />
          </div>
          
          {/* Custom continuous premium gradient overlay mask (seamless desktop transition) */}
          <div 
            className="absolute inset-0 z-10 hidden lg:block" 
            style={{ 
              background: 'linear-gradient(to right, #031530 0%, #031530 30%, rgba(3, 21, 48, 0.95) 45%, rgba(3, 21, 48, 0.7) 65%, rgba(3, 21, 48, 0.2) 85%, transparent 100%)' 
            }} 
          />
          {/* Mobile vertical gradient overlay mask */}
          <div 
            className="absolute inset-0 z-10 lg:hidden" 
            style={{ 
              background: 'linear-gradient(to bottom, rgba(3, 21, 48, 0.95) 0%, rgba(3, 21, 48, 0.8) 50%, rgba(3, 21, 48, 0.98) 100%)' 
            }} 
          />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-2xl text-left space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Ready to Design <span className="text-brand-teal">Your Future?</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 max-w-md font-medium">
                Join thousands of students and parents unlocking true cognitive potential, matching with mentors, and creating future-ready skillsets.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-btn-accent hover:bg-orange-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-text-inverse transition-colors shadow-lg animate-pulse"
                >
                  Start Journey Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>
      </div>
    </div>
  );
}
