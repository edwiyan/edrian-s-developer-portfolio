import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Globe, Phone } from "lucide-react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { profile } from "@/data/portfolio";
import SectionLabel from "@/components/SectionLabel";

/** Button that leans toward the pointer. */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (e.clientX - r.left - r.width / 2) * 0.3,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.6,
          ease: "power3",
        });
      }}
      onPointerLeave={() => gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" })}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Lines only: splitting into chars would break the gradient on "something."
        const split = SplitText.create("[data-cta]", { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 120,
          rotate: 3,
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-cta]", start: "top 85%" },
        });
        gsap.from("[data-contact-in]", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-contact-row]", start: "top 90%" },
        });
        // Glow follows the section into view.
        gsap.fromTo("[data-glow]", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true } });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { icon: Github, label: "GitHub", href: profile.github },
    { icon: Globe, label: "OnlineJobs.ph", href: profile.onlinejobs },
    { icon: Phone, label: profile.phone, href: profile.phoneHref },
  ];

  return (
    <section id="contact" ref={root} className="relative overflow-hidden pb-16 pt-24 sm:pt-32 lg:pt-44">
      <div
        data-glow
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.22),transparent_60%)]"
        aria-hidden
      />
      <div className="shell relative">
        <SectionLabel index="05" title="Contact" />
        <h2 data-cta className="display mt-10 text-[clamp(2.5rem,10.5vw,13rem)]">
          Let's build
          <br />
          <span className="text-gradient">something.</span>
        </h2>

        <div data-contact-row className="mt-14 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <div data-contact-in className="max-w-xl">
            <p className="text-lg leading-relaxed text-ink/70">
              Need a system that replaces spreadsheets, a dashboard your office will actually open, or a fast, modern website? Send me a message.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:items-center">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-accent px-8 py-5 text-base" data-cursor="mail">
                  Email me <ArrowUpRight size={18} />
                </a>
              </Magnetic>
              <button onClick={copy} className="btn-ghost justify-between gap-3 px-5 py-5 font-mono text-xs sm:text-sm">
                <span className="truncate">{profile.email}</span>
                {copied ? <Check size={16} className="shrink-0 text-emerald-400" /> : <Copy size={16} className="shrink-0" />}
              </button>
            </div>
          </div>

          <ul data-contact-in className="flex flex-col divide-y divide-line/10 border-y border-line/10 lg:min-w-[320px]">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-6 py-4 text-sm"
                >
                  <span className="flex items-center gap-3 text-ink/80 transition-colors group-hover:text-ink">
                    <l.icon size={16} className="text-accent" /> {l.label}
                  </span>
                  <ArrowUpRight size={16} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
