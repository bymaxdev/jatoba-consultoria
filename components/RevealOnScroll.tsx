"use client";

import {
  useLayoutEffect,
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

export function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
}: RevealOnScrollProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const node = el;
    let observer: IntersectionObserver | null = null;
    let raf1 = 0;
    let raf2 = 0;

    function isLikelyInView() {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      // Alinhado ao rootMargin -10% inferior: não revela só com “um pedaço” rente à borda de baixo.
      const visibleBottom = vh * 0.9;
      return (
        rect.bottom > 0 &&
        rect.top < visibleBottom &&
        rect.right > 0 &&
        rect.left < vw
      );
    }

    function reveal() {
      setIntersected(true);
      observer?.unobserve(node);
    }

    function attachObserver() {
      if (isLikelyInView()) {
        reveal();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) reveal();
        },
        {
          // Recua o “limite” inferior (~10%): o bloco precisa subir um pouco mais na tela antes de animar,
          // dando sensação de chegada. Mantém threshold 0 para não exigir % mínima do alvo (evita mobile vazio).
          rootMargin: "0px 0px -10% 0px",
          threshold: 0,
        },
      );

      observer.observe(node);
    }

    // Dois frames: layout estável após hidratação / chrome dinâmico no mobile.
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(attachObserver);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer?.disconnect();
    };
  }, [prefersReducedMotion]);

  const visible = prefersReducedMotion || intersected;

  return (
    <div
      ref={ref}
      className={[
        "transform-gpu transition-[opacity,transform] duration-1150 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-14 scale-[0.97] opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        delayMs > 0
          ? { transitionDelay: visible ? `${delayMs}ms` : "0ms" }
          : undefined
      }
    >
      {children}
    </div>
  );
}
