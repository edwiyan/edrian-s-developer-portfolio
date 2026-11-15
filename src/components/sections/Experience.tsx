import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import SectionLabel from "@/components/SectionLabel";
import { cn } from "@/lib/utils";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // The timeline rail draws itself as you scroll.
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-jobs]", start: "top 70%", end: "bottom 70%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job) => {
          gsap
            .timeline({ scrollTrigger: { trigger: job, start: "top 80%" } })
            .from(job.querySelector("[data-dot]"), { scale: 0, duration: 0.5, ease: "back.out(3)" })
            .from(job.querySelectorAll("[data-job-in]"), { y: 40, opacity: 0, stagger: 0.07, duration: 0.9 }, 0.1);
        });
        gsap.from("[data-exp-title]", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-exp-title]", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="03" title="Experience" />
            <h2 data-exp-title className="display mt-8 text-[clamp(2.6rem,10vw,6rem)] lg:text-[clamp(2.6rem,4vw,4.1rem)]">
              Where I've <span className="text-gradient">worked.</span>
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/60">
              From IT support to front-end work to owning full systems in production for a government office.
            </p>
          </div>
        </div>

        <ol data-jobs className="relative lg:col-span-8">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line/10" aria-hidden />
          <span data-rail className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent" aria-hidden />

          {experience.map((job) => (
            <li key={job.title + job.company} data-job className="relative pb-16 pl-10 last:pb-0 sm:pl-14">
              <span
                data-dot
                className={cn(
                  "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2",
                  job.current ? "border-accent bg-accent shadow-[0_0_24px_rgb(var(--accent)/0.8)]" : "border-line/30 bg-bg",
                )}
              />
              <div data-job-in className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-ink/80">{job.period}</span>
                {job.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /> Current
                  </span>
                )}
              </div>
              <h3 data-job-in className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                {job.title}
              </h3>
              <p data-job-in className="mt-2 text-sm text-accent-2 sm:text-base">
                {job.company} <span className="text-muted">· {job.location}</span>
              </p>
              <p data-job-in className="mt-5 max-w-2xl leading-relaxed text-ink/70">
                {job.summary}
              </p>
              {job.bullets && (
                <ul data-job-in className="mt-5 max-w-2xl space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                      <span className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <ul data-job-in className="mt-6 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
