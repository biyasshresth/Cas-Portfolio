import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScrollRevealContextValue {
  activeSteps: Set<number>;
  registerSentinel: (step: number, el: HTMLElement) => void;
  unregisterSentinel: (step: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ScrollRevealContext = createContext<ScrollRevealContextValue>({
  activeSteps: new Set(),
  registerSentinel: () => {},
  unregisterSentinel: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
//
// Watches invisible sentinel <div>s placed in the document flow.
// When a sentinel's top edge crosses 65% of the viewport height
// (i.e. comes into the lower portion of the screen), its step becomes
// "active". When it scrolls back above that line, the step deactivates.
//
// This gives us precise, per-scroll-gesture control: each sentinel lives
// far enough apart that one scroll movement crosses exactly one threshold.

export const ScrollRevealProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeSteps, setActiveSteps] = useState<Set<number>>(new Set());
  const sentinelsRef = useRef<Map<number, HTMLElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const prevActiveRef = useRef<Set<number>>(new Set());

  const registerSentinel = (step: number, el: HTMLElement) => {
    sentinelsRef.current.set(step, el);
  };

  const unregisterSentinel = (step: number) => {
    sentinelsRef.current.delete(step);
  };

  useEffect(() => {
    const TRIGGER_RATIO = 0.65; // sentinel must be above 65% of viewport height

    const evaluate = () => {
      const vh = window.innerHeight;
      const triggerY = vh * TRIGGER_RATIO;
      const next = new Set<number>();

      sentinelsRef.current.forEach((el, step) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          next.add(step);
        }
      });

      // Only update state if something actually changed
      const prev = prevActiveRef.current;
      const changed =
        next.size !== prev.size ||
        [...next].some((s) => !prev.has(s));

      if (changed) {
        prevActiveRef.current = next;
        setActiveSteps(new Set(next));
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    evaluate(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <ScrollRevealContext.Provider
      value={{ activeSteps, registerSentinel, unregisterSentinel }}
    >
      {children}
    </ScrollRevealContext.Provider>
  );
};

// ─── ScrollSentinel ───────────────────────────────────────────────────────────
//
// An invisible zero-height marker placed in the document flow.
// The provider watches its position to decide when to activate a step.

export const ScrollSentinel: React.FC<{ step: number }> = ({ step }) => {
  const { registerSentinel, unregisterSentinel } = useContext(ScrollRevealContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) registerSentinel(step, ref.current);
    return () => unregisterSentinel(step);
  }, [step, registerSentinel, unregisterSentinel]);

  return <div ref={ref} aria-hidden="true" style={{ height: 0, pointerEvents: "none" }} />;
};

// ─── ScrollReveal ─────────────────────────────────────────────────────────────
//
// Wraps content that should appear/disappear based on whether its `step`
// is currently active. Accepts an optional `delay` (ms) for staggering
// siblings that share the same step.

interface ScrollRevealProps {
  children: React.ReactNode;
  step: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  step,
  delay = 0,
  className = "",
  style = {},
}) => {
  const { activeSteps } = useContext(ScrollRevealContext);
  const isActive = activeSteps.has(step);

  // We use a local visible state so we can apply the delay properly
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (isActive) {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    } else {
      // Hide immediately (no delay on exit, feels snappier)
      setVisible(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(22px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};