import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Short counter + curtain intro. Calls onDone when the curtain starts lifting. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onDone();
        setGone(true);
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLSpanElement>("[data-num]")!;
      gsap
        .timeline({
          onComplete: () => {
            document.documentElement.style.overflow = "";
            setGone(true);
          },
        })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        })
        .to("[data-bar]", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .to("[data-fade]", { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
        .add(onDone)
        .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[80] flex flex-col justify-end bg-bg-2 p-[var(--gutter)] pb-10">
      <div data-fade className="flex items-end justify-between gap-6">
        <p className="eyebrow max-w-[14rem] leading-relaxed">
          Edrian Christian C. Reyes
          <br />
          Portfolio — 2026
        </p>
        <span data-num className="display text-[22vw] text-ink sm:text-[12rem]">
          000
        </span>
      </div>
      <div data-fade className="mt-6 h-px w-full bg-line/10">
        <div data-bar className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
