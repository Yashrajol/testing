/**
 * FadeIn – A reusable scroll-reveal wrapper.
 * Wraps children in a motion.div that fades + slides in when it enters
 * the viewport. Uses Framer Motion's useInView for trigger control.
 *
 * Props:
 *   delay   – stagger delay in seconds (default 0)
 *   y       – starting Y offset in px (default 24)
 *   x       – starting X offset in px (default 0)
 *   once    – only animate once (default true)
 *   className – forwarded to the wrapper div
 */
import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  className?: string;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  x = 0,
  once = true,
  className,
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer – Wraps a group of children and staggers their FadeIn
 * animations with an incrementing delay. Children are indexed automatically.
 */
interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  baseDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}
