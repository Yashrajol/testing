import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "./logo";
import { FloatingWidgets } from "./floating-widgets";
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, ChevronDown, Home } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/use-lenis";

export function MarketingLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Lenis smooth scroll — active for all marketing pages
  useLenis();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeTop = pathname === "/" && !scrolled;
  const isTransparentHeader = isHomeTop && !open;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    alert("Thank you for subscribing to Vedhkrit Learner Insights!");
  };

  const navLinkClass = (toPath: string) => cn(
    "rounded px-2.5 py-1.5 text-xs font-bold transition-all duration-200",
    isTransparentHeader
      ? (pathname === toPath
          ? "text-brand-navy bg-slate-200/50"
          : "text-slate-800 hover:text-brand-blue hover:bg-slate-100/50")
      : (pathname === toPath
          ? "text-brand-navy bg-bg-secondary"
          : "text-text-body hover:text-brand-blue hover:bg-bg-secondary")
  );

  const getDropdownBtnClass = () => cn(
    "flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-bold transition-all duration-200",
    isTransparentHeader
      ? "text-slate-800 hover:text-brand-blue hover:bg-slate-100/50"
      : "text-text-body hover:text-brand-blue hover:bg-bg-secondary"
  );

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-body font-sans">
      {/* 1. HEADER (Frosted Liquid Glassmorphism) */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isTransparentHeader
          ? "bg-transparent border-b border-transparent shadow-none text-text-body lg:text-white"
          : "bg-white/70 border-b border-border-default/30 backdrop-blur-lg backdrop-saturate-150 shadow-sm text-text-body"
      )}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 relative">
          {/* Left Slot Group: Hamburger menu + Logo Bookmark */}
          <div className="flex items-center gap-2 sm:gap-3 z-50">
            {/* Mobile menu trigger (Circular style matching reference) */}
            <button
              className={cn(
                "xl:hidden p-2 rounded-full transition-all duration-200 flex items-center justify-center border",
                isTransparentHeader 
                  ? "bg-white border-slate-100 shadow-sm text-brand-navy hover:bg-slate-50" 
                  : "bg-white border-slate-100 shadow-xs text-text-body hover:text-brand-blue"
              )}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>

            {/* Logo Bookmark Wrapper */}
            <div className="relative w-24 sm:w-32 md:w-36 h-14 flex items-center justify-start">
              <div className={cn(
                "transition-all duration-300 flex items-center justify-center",
                isTransparentHeader
                  ? "absolute top-0 left-0 bg-white border-x border-b border-slate-200/50 rounded-b-2xl h-[62px] sm:h-[70px] w-full px-2 sm:px-3 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:h-[66px] sm:hover:h-[75px] lg:flex"
                  : "w-full h-full flex items-center justify-start rounded-xl"
              )}>
                <Logo variant="light" className={isTransparentHeader ? "h-6 sm:h-8 -translate-y-[3px]" : "h-7 sm:h-9"} />
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-0.5 xl:flex">
            <Link to="/assessment" className={navLinkClass("/assessment")}>
              AI Discovery
            </Link>
            <Link to="/mentoring" className={navLinkClass("/mentoring")}>
              Mentoring
            </Link>
            <Link to="/slec" className={navLinkClass("/slec")}>
              Growth Studio
            </Link>
            <Link to="/framework" className={navLinkClass("/framework")}>
              ILDF Framework
            </Link>
            <Link to="/career" className={navLinkClass("/career")}>
              Career Blueprint
            </Link>
            <Link to="/" hash="parents" className={navLinkClass("/#parents")}>
              For Parents
            </Link>
            <Link to="/stories" className={navLinkClass("/stories")}>
              Resources
            </Link>
          </nav>

          {/* Desktop Right Actions (10% brand accents) */}
          <div className="hidden items-center gap-2 xl:flex">
            <Link
              to="/login"
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                isTransparentHeader
                  ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-2xs"
                  : "border border-brand-blue bg-btn-secondary text-brand-navy hover:bg-btn-secondary-hover"
              )}
            >
              Login
            </Link>
            <Link to="/register" className="rounded-md bg-btn-accent hover:bg-orange-600 px-3.5 py-1.5 text-xs font-bold text-text-inverse transition-colors shadow-sm shadow-orange-600/10">
              Take Free Assessment
            </Link>
          </div>

          {/* Mobile Login Button - Right Side (Visible only on mobile/tablet) */}
          <Link
            to="/login"
            className={cn(
              "xl:hidden px-3.5 py-1.5 rounded-md text-xs font-bold transition-all duration-200 z-50",
              isTransparentHeader
                ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs"
                : "border border-brand-blue bg-btn-secondary text-brand-navy hover:bg-btn-secondary-hover"
            )}
          >
            Login
          </Link>
        </div>

        {/* Mobile slide-out panel */}
        {open && (
          <div className="border-t border-border-default bg-card-default px-4 py-3 xl:hidden space-y-1 shadow-sm text-left max-h-[80dvh] overflow-y-auto">
            <Link to="/assessment" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              AI Discovery
            </Link>
            <Link to="/mentoring" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              Mentoring
            </Link>
            <Link to="/slec" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              Growth Studio
            </Link>
            <Link to="/framework" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              ILDF Framework
            </Link>
            <Link to="/career" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              Career Blueprint
            </Link>
            <Link to="/" hash="parents" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              For Parents
            </Link>
            <Link to="/stories" onClick={() => setOpen(false)} className="block rounded px-2.5 py-1.5 text-xs font-semibold hover:bg-bg-secondary text-text-body">
              Resources
            </Link>
            
            <div className="flex gap-2 pt-3 border-t border-border-default mt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-md border border-brand-blue bg-btn-secondary py-2 text-center text-xs font-bold text-brand-navy">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1 rounded-md bg-btn-accent py-2 text-center text-xs font-bold text-text-inverse">
                Take Free Assessment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Pages Outlet */}
      <main className={cn(
        "flex-grow",
        pathname === "/" ? "pt-0" : "pt-14"
      )}>
        <Outlet />
      </main>

      {/* 2. FOOTER (Premium White Background Design) */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 pt-6 pb-4 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Main Links Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 pb-4 border-b border-slate-200">
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-3">
              <Logo variant="light" size="lg" />
              <p className="text-[11px] leading-relaxed text-slate-500 pr-4 mt-2">
                An integrated learner development platform helping students discover potential, identify skills, and design their future.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2 pt-1">
                {[
                  { icon: Facebook, link: "#" },
                  { icon: Instagram, link: "#" },
                  { icon: Linkedin, link: "#" },
                  { icon: Youtube, link: "#" }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="h-7 w-7 rounded border border-slate-200 hover:border-brand-teal hover:text-brand-blue text-slate-500 flex items-center justify-center transition-colors">
                    <social.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 text-left">
              <h5 className="font-bold text-slate-800 mb-2.5">Explore</h5>
              <ul className="space-y-1.5 text-slate-500">
                <li><Link to="/about" className="hover:text-brand-blue transition-colors">Why Vedhkrit</Link></li>
                <li><Link to="/framework" className="hover:text-brand-blue transition-colors">Solutions</Link></li>
                <li><Link to="/assessment" className="hover:text-brand-blue transition-colors">Assessment</Link></li>
                <li><Link to="/career" className="hover:text-brand-blue transition-colors">Career Pathways</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 text-left">
              <h5 className="font-bold text-slate-800 mb-2.5">Ecosystem Portals</h5>
              <ul className="space-y-1.5 text-slate-500">
                <li><Link to="/dashboard/student" className="hover:text-brand-blue transition-colors">Student Portal</Link></li>
                <li><Link to="/dashboard/parent" className="hover:text-brand-blue transition-colors">Parent Portal</Link></li>
                <li><Link to="/dashboard/mentor" className="hover:text-brand-blue transition-colors">Mentor Lounge</Link></li>
                <li><Link to="/dashboard/admin" className="hover:text-brand-blue transition-colors">School Portal</Link></li>
                <li><Link to="/dashboard/super" className="hover:text-brand-blue transition-colors">Platform Admin</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 text-left">
              <h5 className="font-bold text-slate-800 mb-2.5">Support</h5>
              <ul className="space-y-1.5 text-slate-500">
                <li><Link to="/contact" className="hover:text-brand-blue transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-brand-blue transition-colors">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-brand-blue transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-brand-blue transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contacts Column */}
            <div className="lg:col-span-2 text-left space-y-2 text-slate-500">
              <h5 className="font-bold text-slate-800 mb-2.5">Contact Us</h5>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                <span>vedhkrit@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-teal shrink-0" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Bottom segment: Newsletter & QR Mockup panel */}
          <div className="grid gap-4 md:grid-cols-2 py-2.5 items-center">
            {/* Newsletter input card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h6 className="font-bold text-slate-800">Stay Updated</h6>
                <p className="text-[11px] text-slate-500">Subscribe to our newsletter</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-1.5 w-full sm:w-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-teal w-full sm:w-37.5"
                />
                <button type="submit" className="rounded bg-btn-accent hover:bg-orange-600 px-3 py-1.5 text-xs font-bold text-text-inverse transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            {/* QR Code widget */}
            <div className="flex items-center justify-end gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Scan to</div>
                <div className="text-xs font-bold text-brand-teal">Take Free Assessment</div>
              </div>
              <div className="h-12 w-12 bg-white rounded-lg p-1 flex items-center justify-center shadow-xs border border-slate-100">
                <svg viewBox="0 0 24 24" className="h-full w-full text-slate-800" fill="currentColor">
                  <path d="M2 2h6v6H2V2zm1.5 1.5v3h3v-3h-3zM2 16h6v6H2v-6zm1.5 1.5v3h3v-3h-3zM16 2h6v6h-6V2zm1.5 1.5v3h3v-3h-3zM18 10h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v4h-2v-4zm-4-4h2v2h-2v-2zm4 4h2v-2h-2v2zm-4 4h2v2h-2v-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="border-t border-slate-200 pt-3 text-center text-[10px] sm:text-[11px] text-slate-500 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
            <span>© 2026 Vedhkrit Private Limited. All Rights Reserved.</span>
            <span className="text-slate-200 hidden sm:inline">|</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span className="text-slate-200">|</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span className="text-slate-200">|</span>
            <span>
              Technology & Development Partner:{" "}
              <a href="https://udyamedge.com" target="_blank" rel="noreferrer" className="font-bold text-brand-teal hover:text-teal-600 transition-colors uppercase tracking-wider ml-1 text-[11px]">
                Udyamedge Private Limited
              </a>
            </span>
          </div>
        </div>
      </footer>
      <FloatingWidgets />
    </div>
  );
}
