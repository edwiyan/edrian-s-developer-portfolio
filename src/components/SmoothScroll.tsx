import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** Keeps ScrollTrigger in sync with Lenis' virtual scroll position. */
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // GSAP's ticker drives Lenis so both run on one animation frame.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [reduce]);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.09, wheelMultiplier: 1, anchors: { offset: 0 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
