import { Link } from "@tanstack/react-router";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "transparent-light";
}

export function Logo({
  className = "",
  iconOnly = false,
  size = "md",
  variant = "light"
}: LogoProps) {
  const heightClass = className.includes("h-") ? "" : {
    sm: "h-7",
    md: "h-9",
    lg: "h-14"
  }[size];


  // If square icon-only is requested
  if (iconOnly) {
    const squareSize = {
      sm: "h-8 w-8",
      md: "h-11 w-11",
      lg: "h-16 w-16"
    }[size];
    return (
      <Link to="/" className={`inline-block hover:scale-[1.02] transition-transform ${className}`}>
        <img
          src="/assets/brand/logo-square.png"
          alt="Vedhkrit Icon"
          className={`${squareSize} rounded-xl object-contain shadow-sm border border-slate-100`}
        />
      </Link>
    );
  }

  // If rendering in a dark layout, wrap the horizontal logo image in a clean white card for maximum brand readability
  if (variant === "dark") {
    return (
      <Link to="/" className={`inline-block bg-white hover:bg-slate-50 transition-colors p-2 rounded-xl shadow-md shadow-black/10 ${className}`}>
        <img
          src="/assets/brand/logo-horizontal.png"
          alt="Vedhkrit Logo"
          className="h-7 w-auto object-contain"
        />
      </Link>
    );
  }

  // Standard horizontal logo rendering (ideal for navbar)
  return (
    <Link to="/" className={`flex items-center hover:scale-[1.01] transition-transform ${className}`}>
      <img
        src="/assets/brand/logo-horizontal.png"
        alt="Vedhkrit Logo"
        className={`${heightClass} w-auto object-contain`}
      />
    </Link>
  );
}
