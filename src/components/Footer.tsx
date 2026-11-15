import { ArrowUp } from "lucide-react";
import { useScrollTo } from "@/lib/scroll";
import { profile } from "@/data/portfolio";

export default function Footer() {
  const scrollTo = useScrollTo();
  return (
    <footer className="border-t border-line/[0.07]">
      <div className="shell flex flex-col gap-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, GSAP, Lenis &amp; Three.js.
        </p>
        <div className="flex items-center justify-between gap-6">
          <span className="font-mono">{profile.location}</span>
          <button onClick={() => scrollTo("home")} className="inline-flex items-center gap-2 text-ink/80 hover:text-ink">
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
