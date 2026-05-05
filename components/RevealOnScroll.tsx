"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Atraso da animação após o elemento entrar na viewport (ms). */
  delayMs?: number;
};

export function RevealOnScroll({ children, className = "", delayMs = 0 }: RevealOnScrollProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIntersected(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  const visible = prefersReducedMotion || intersected;

  return (
    <div
      ref={ref}
      className={[
        "transform-gpu transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={delayMs > 0 ? { transitionDelay: visible ? `${delayMs}ms` : "0ms" } : undefined}
    >
      {children}
    </div>
  );
}
