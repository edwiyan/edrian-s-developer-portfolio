import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { marquee, skillGroups } from "@/data/portfolio";
import SectionLabel from "@/components/SectionLabel";

function MarqueeRow({ items, reverse, outline }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  return (
    <div data-row data-dir={reverse ? -1 : 1} className="flex w-max select-none" aria-hidden>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {items.map((t) => (
            <span key={t + copy} className="flex items-center">
              <span
                className="display px-5 text-[clamp(3rem,9vw,8.5rem)] leading-[1.05] sm:px-8"
                style={outline ? { WebkitTextStroke: "1px rgb(var(--ink) / 0.35)", color: "transparent" } : undefined}
              >
                {t}
              </span>
              <span className="text-[clamp(1.5rem,3vw,3rem)] text-accent">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Infinite marquees whose speed and direction follow scroll velocity.
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]").map((row) => {
          const dir = Number(row.dataset.dir);
          const tween = gsap.fromTo(
            row,
            { xPercent: dir === 1 ? 0 : -50 },
            { xPercent: dir === 1 ? -50 : 0, duration: 40, ease: "none", repeat: -1 },
          );
          return tween;
        });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 7);
            rows.forEach((t) => {
              gsap.to(t, {
                timeScale: boost,
                duration: 0.2,
                overwrite: true,
                onComplete: () => void gsap.to(t, { timeScale: 1, duration: 1.2, overwrite: true }),
              });
            });
          },
        });

        gsap.from("[data-group]", {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-groups]", start: "top 85%" },
        });

        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="skills" ref={root} className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell">
        <SectionLabel index="04" title="Skills & tools" />
      </div>

      <div className="mt-12 space-y-2 sm:mt-16">
        <MarqueeRow items={marquee.slice(0, 6)} />
        <MarqueeRow items={marquee.slice(6)} reverse outline />
      </div>
      <p className="sr-only">Main tools: {marquee.join(", ")}</p>

      <div className="shell mt-20 sm:mt-28">
        <div data-groups className="grid gap-px overflow-hidden rounded-3xl border border-line/[0.08] bg-line/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <div key={g.title} data-group className="group relative bg-bg p-6 transition-colors duration-500 hover:bg-bg-2 sm:p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-bold tracking-tight">{g.title}</h3>
                <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="chip transition-colors group-hover:border-line/20 group-hover:text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
