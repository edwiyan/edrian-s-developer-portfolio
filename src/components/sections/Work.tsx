import { useRef } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { featured, type Project } from "@/data/portfolio";
import SectionLabel from "@/components/SectionLabel";
import ScreenFrame from "@/components/ScreenFrame";
import { cn } from "@/lib/utils";

const statusTone: Record<Project["status"], string> = {
  Live: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Deployed on-site": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "In progress": "text-accent-2 border-accent-2/30 bg-accent-2/10",
  Completed: "text-sky-300 border-sky-300/30 bg-sky-300/10",
  Personal: "text-violet-300 border-violet-300/30 bg-violet-300/10",
};

export function StatusPill({ status }: { status: Project["status"] }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider", statusTone[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Panel({ p, i }: { p: Project; i: number }) {
  return (
    <article
      data-panel
      className="relative grid w-full shrink-0 gap-6 lg:h-full lg:w-[min(82vw,1240px)] lg:grid-cols-12 lg:items-center lg:gap-10"
    >
      <div className="relative lg:col-span-8">
        <div data-reveal>
          <ScreenFrame project={p} eager={i === 0} />
        </div>
        {p.mobileImage && (
          <img
            src={p.mobileImage}
            alt={`${p.title} on a phone`}
            loading="lazy"
            data-phone
            className="absolute -bottom-6 -right-2 hidden w-[18%] rounded-[18px] border-4 border-bg-2 shadow-2xl sm:block lg:-right-8"
          />
        )}
      </div>

      <div className="lg:col-span-4">
        <div data-copy className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
          <StatusPill status={p.status} />
          <span className="font-mono text-[10px] text-muted">{p.year}</span>
        </div>
        <h3 data-copy className="display mt-5 text-balance text-[clamp(1.9rem,2.7vw,2.9rem)] leading-[0.95] [overflow-wrap:anywhere]">
          {p.title}
        </h3>
        <p data-copy className="mt-2 text-sm text-accent-2">
          {p.short}
        </p>
        <p data-copy className="mt-5 text-[15px] leading-relaxed text-ink/70">
          {p.description}
        </p>
        <ul data-copy className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <div data-copy className="mt-7">
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium" data-cursor="open">
              <span className="border-b border-accent/60 pb-0.5 transition-colors group-hover:border-ink">{p.urlLabel}</span>
              <ArrowUpRight size={16} className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <Lock size={14} /> {p.note ?? "Internal system · sign-in required"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create("[data-work-title]", { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-work-title]", start: "top 85%" },
        });
        return () => split.revert();
      });

      // Desktop: pinned horizontal gallery.
      mm.add(MQ.desktop, () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;
        const scroller = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set("[data-work-progress]", { scaleX: self.progress });
              const idx = Math.min(featured.length, Math.floor(self.progress * featured.length) + 1);
              const c = root.current?.querySelector("[data-work-count]");
              if (c) c.textContent = String(idx).padStart(2, "0");
            },
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scroller,
              start: i === 0 ? "left 100%" : "left 85%",
              end: "left 25%",
              scrub: 1,
            },
          });
          tl.fromTo(panel.querySelector("[data-reveal]"), { clipPath: "inset(10% 40% 10% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", ease: "none" })
            .fromTo(panel.querySelector("[data-frame-img]"), { scale: 1.3, xPercent: 8 }, { scale: 1, xPercent: 0, ease: "none" }, 0)
            .from(panel.querySelectorAll("[data-copy]"), { x: 80, opacity: 0, stagger: 0.06, ease: "power2.out" }, 0.1);
          const phone = panel.querySelector("[data-phone]");
          if (phone) tl.from(phone, { yPercent: 60, rotate: 8, opacity: 0, ease: "power2.out" }, 0.2);
        });
      });

      // Mobile & tablet: vertical stack with reveal-on-enter.
      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap
            .timeline({ scrollTrigger: { trigger: panel, start: "top 80%" } })
            .fromTo(panel.querySelector("[data-reveal]"), { clipPath: "inset(12% 12% 12% 12% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.2, ease: "expo.out" })
            .fromTo(panel.querySelector("[data-frame-img]"), { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "expo.out" }, 0)
            .from(panel.querySelectorAll("[data-copy]"), { y: 30, opacity: 0, stagger: 0.06, duration: 0.8 }, 0.2);
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative">
      <div className="shell pb-16 pt-24 sm:pt-32 lg:pb-10">
        <SectionLabel index="02" title="Selected work" />
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 data-work-title className="display max-w-4xl text-[clamp(2.6rem,7vw,7rem)]">
            Systems I built for <span className="text-gradient">DepEd SDO Bulacan.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-ink/60">
            July 2026 to today: six systems for HR, supply, procurement, records and the division's 31 districts, most of them already live.
          </p>
        </div>
      </div>

      <div ref={pin} className="relative lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden">
        <div
          ref={track}
          className="shell flex flex-col gap-24 pb-10 sm:gap-28 lg:h-[min(74vh,760px)] lg:w-max lg:max-w-none lg:flex-row lg:gap-[8vw] lg:pb-0 lg:pr-[10vw]"
        >
          {featured.map((p, i) => (
            <Panel key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block">
          <div className="shell flex items-center gap-6">
            <span className="font-mono text-xs text-ink">
              <span data-work-count>01</span>
              <span className="text-muted"> / {String(featured.length).padStart(2, "0")}</span>
            </span>
            <div className="h-px flex-1 bg-line/10">
              <div data-work-progress className="h-full origin-left scale-x-0 bg-accent" />
            </div>
            <span className="eyebrow">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
