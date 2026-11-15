import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { projects, type Project } from "@/data/portfolio";
import ScreenFrame from "@/components/ScreenFrame";
import { StatusPill } from "./Work";

/** Card that tilts toward the pointer (fine pointers only; touch just taps through). */
function TiltCard({ p }: { p: Project }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const Wrapper = p.url ? motion.a : motion.div;
  const linkProps = p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer", "data-cursor": "open" } : {};

  return (
    <Wrapper
      {...linkProps}
      data-card
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative flex flex-col rounded-3xl border border-line/[0.07] bg-line/[0.02] p-3 transition-colors duration-500 hover:border-accent/30 hover:bg-line/[0.04] sm:p-4"
    >
      <ScreenFrame project={p} className="shadow-none" />
      <div className="flex flex-1 flex-col p-3 pt-6 sm:p-4 sm:pt-6">
        <div className="flex items-center justify-between gap-3">
          <StatusPill status={p.status} />
          <span className="font-mono text-[10px] text-muted">{p.year}</span>
        </div>
        <h3 className="mt-4 flex items-start justify-between gap-4 font-display text-2xl font-bold leading-tight tracking-tight">
          {p.title}
          {p.url && <ArrowUpRight className="mt-1 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />}
        </h3>
        <p className="mt-1 text-sm text-accent-2">{p.short}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">{p.description}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {p.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default function MoreProjects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-more-head] > *", {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-more-head]", start: "top 85%" },
        });
        ScrollTriggerBatch();
      });
      return () => mm.revert();

      function ScrollTriggerBatch() {
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1.1,
            delay: (i % 2) * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          });
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-24 sm:py-32">
      <div className="shell">
        <div data-more-head className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display text-[clamp(2.2rem,5vw,4.5rem)]">
            More projects<span className="text-accent">.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Freelance, capstone and personal builds, from a barangay system to an AI music tool.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {projects.map((p) => (
            <TiltCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
