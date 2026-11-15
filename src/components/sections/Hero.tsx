import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { useScrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import SceneBoundary from "@/components/three/SceneBoundary";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

/** CSS-only glow used while the 3D scene loads, or if WebGL is unavailable. */
const Orb = () => (
  <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
    <div className="h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgb(var(--accent-2)/0.5),rgb(var(--accent)/0.25)_40%,transparent_70%)] blur-2xl" />
  </div>
);

function useLiteMode() {
  const [lite] = useState(() => {
    if (typeof window === "undefined") return true;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    return small || weak;
  });
  return lite;
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(true);
  const lite = useLiteMode();
  const scrollTo = useScrollTo();

  // Pause the render loop when the hero is off-screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const split = SplitText.create("[data-hero-name]", { type: "chars", mask: "chars" });
        gsap
          .timeline({ delay: 0.1 })
          .from(split.chars, { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.045 })
          .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.9")
          .from("[data-hero-scene]", { opacity: 0, scale: 0.8, duration: 2, ease: "expo.out" }, 0.2);

        // Pinned zoom-through: the name scales past the camera into the next section.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              pinSpacing: false, // About slides over the hero like a curtain
              scrub: 1,
              onUpdate: (self) => (progress.current = self.progress),
            },
          })
          .to("[data-hero-name]", { scale: 9, ease: "power2.in", transformOrigin: "50% 42%", duration: 0.5 }, 0)
          .to("[data-hero-name]", { opacity: 0, ease: "power1.in", duration: 0.2 }, 0.3)
          .to("[data-hero-copy]", { y: -60, opacity: 0, ease: "power1.in", duration: 0.25 }, 0)
          .to("[data-hero-scene]", { scale: 1.25, duration: 1 }, 0)
          .to("[data-hero-veil]", { opacity: 0.85, duration: 0.5 }, 0.5);

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  // Pin spacing changes page height once fonts load; refresh triggers then.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
    <section id="home" ref={root} className="relative h-[100svh] min-h-[560px] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgb(var(--accent)/0.12),transparent_70%)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgb(var(--line)/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        aria-hidden
      />

      <div data-hero-scene className="absolute inset-0">
        <SceneBoundary fallback={<Orb />}>
          <Suspense fallback={<Orb />}>
            <HeroScene progress={progress} lite={lite} active={active} />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="shell relative flex h-full flex-col justify-between pb-6 pt-24 sm:pb-10 sm:pt-28">
        <div data-hero-copy className="flex items-start justify-between gap-6">
          <p data-hero-fade className="eyebrow flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            Available for projects
          </p>
          <p data-hero-fade className="eyebrow text-right">
            {profile.role}
            <br />
            {profile.location}
          </p>
        </div>

        <h1
          data-hero-name
          className="display pointer-events-none select-none whitespace-nowrap text-center text-[clamp(3rem,16.5vw,17rem)] will-change-transform"
          aria-label={profile.name}
        >
          <span className="block">{profile.firstName}</span>
          {/* Outlined surname: stroke is inherited by split characters, unlike background-clip gradients. */}
          <span className="block text-transparent [-webkit-text-stroke:1.5px_rgb(var(--ink)/0.85)] sm:[-webkit-text-stroke:2px_rgb(var(--ink)/0.85)]">
            {profile.lastName}
            <span className="text-accent [-webkit-text-stroke:0]">.</span>
          </span>
        </h1>

        <div data-hero-copy className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            {profile.tagline}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo("work")} className="btn-accent" data-cursor="view">
              See my work <ArrowUpRight size={16} />
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-ghost">
              Get in touch
            </button>
          </div>
        </div>
      </div>

      <button
        data-hero-copy
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Scroll to about"
      >
        <span className="eyebrow">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-accent" />
        </span>
        <ArrowDown size={12} className="sr-only" />
      </button>

      <div data-hero-veil className="pointer-events-none absolute inset-0 bg-bg opacity-0" aria-hidden />
    </section>
    {/* Scroll room for the zoom before the About curtain arrives (motion only). */}
    <div className="motion-safe:h-[50svh]" aria-hidden />
    </>
  );
}
