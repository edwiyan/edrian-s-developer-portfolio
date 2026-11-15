import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowDownToLine } from "lucide-react";
import { useScrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import logo from "@/assets/img/logo2.png";
import { cn } from "@/lib/utils";

const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Header({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo();
  const lenis = useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 40);
    setHidden(direction === 1 && scroll > 400);
  });

  // Native-scroll fallback (reduced motion: Lenis is off).
  useEffect(() => {
    if (lenis) return;
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 400);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu close before scrolling so Lenis is running again.
    setTimeout(() => scrollTo(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: ready && !(hidden && !open) ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled && !open ? "border-b border-line/[0.06] bg-bg/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between sm:h-20" aria-label="Main">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="flex items-center gap-3"
            aria-label="Back to top"
          >
            <img src={logo} alt="" className="h-9 w-9 sm:h-10 sm:w-10" />
            <span className="hidden font-display text-sm font-bold tracking-tight xs:block">
              Edrian<span className="text-accent">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.id);
                  }}
                  className="group relative px-4 py-2 text-sm text-ink/70 transition-colors hover:text-ink"
                >
                  <span className="mr-1 font-mono text-[10px] text-accent">0{i + 1}</span>
                  {n.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={profile.resume} className="btn-ghost hidden px-5 py-2.5 text-xs sm:inline-flex" target="_blank" rel="noopener noreferrer">
              <ArrowDownToLine size={14} /> Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line/15 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-300", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-300", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg-2 px-[var(--gutter)] pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.id);
                    }}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="display text-[13vw] leading-none">{n.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <a href={`mailto:${profile.email}`} className="text-sm text-ink/70 break-all">
                {profile.email}
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-accent w-full">
                <ArrowDownToLine size={16} /> Download resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
