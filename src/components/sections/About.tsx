import { useRef } from "react";
import { ArrowDownToLine, GraduationCap } from "lucide-react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { about, profile } from "@/data/portfolio";
import SectionLabel from "@/components/SectionLabel";
import photo from "@/assets/img/profile.webp";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Statement: words light up as you scroll through it.
        const split = SplitText.create("[data-statement]", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );

        // Photo: window opens, image settles from a zoom.
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-photo]", start: "top 85%", end: "top 25%", scrub: 1 } })
          .fromTo("[data-photo]", { clipPath: "inset(18% 22% 18% 22% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none" })
          .fromTo("[data-photo] img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0);

        gsap.from("[data-about-p]", {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: { trigger: "[data-about-copy]", start: "top 80%" },
        });

        // Stats count up once.
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
          });
        });
        gsap.from("[data-stat]", {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-stats]", start: "top 85%" },
        });

        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative z-10 rounded-t-[32px] bg-bg py-24 shadow-[0_-40px_100px_rgba(0,0,0,0.7)] sm:rounded-t-[56px] sm:py-32 lg:py-44">
      <div className="shell">
        <SectionLabel index="01" title="About" />

        <p data-statement className="mt-10 max-w-6xl font-display text-[clamp(1.6rem,4.4vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          {about.statement}
        </p>

        <div className="mt-20 grid gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-photo className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-bg-2">
              <img src={photo} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="glass rounded-full px-4 py-2 text-xs">{profile.name}</span>
                <span className="glass rounded-full px-3 py-2 font-mono text-[10px] text-accent-2">PH · UTC+8</span>
              </div>
            </div>
          </div>

          <div data-about-copy className="flex flex-col justify-between gap-12 lg:col-span-7">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <p key={i} data-about-p className="text-lg leading-relaxed text-ink/75 sm:text-xl">
                  {p}
                </p>
              ))}
              <div data-about-p className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
                <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                  <GraduationCap className="shrink-0 text-accent" size={22} />
                  <div>
                    <p className="text-sm font-medium">{about.education.degree}</p>
                    <p className="text-xs text-muted">
                      {about.education.school} · {about.education.years}
                    </p>
                  </div>
                </div>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <ArrowDownToLine size={16} /> Resume
                </a>
              </div>
            </div>

            <dl data-stats className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line/[0.08] bg-line/[0.08]">
              {about.stats.map((s) => (
                <div key={s.label} data-stat className="flex flex-col-reverse bg-bg p-5 sm:p-8">
                  <dt className="mt-2 text-xs leading-snug text-muted sm:text-sm">{s.label}</dt>
                  <dd className="display text-5xl text-ink sm:text-7xl">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-accent">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
