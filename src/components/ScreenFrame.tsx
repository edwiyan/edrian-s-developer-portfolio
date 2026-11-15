import { cn } from "@/lib/utils";
import type { Project } from "@/data/portfolio";

/** Browser-window mockup around a project screenshot. */
export default function ScreenFrame({ project, className, eager }: { project: Project; className?: string; eager?: boolean }) {
  return (
    <div
      data-frame
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line/10 bg-bg-2 shadow-[0_40px_120px_-30px_rgb(var(--accent)/0.25)]",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-2 border-b border-line/[0.07] bg-line/[0.03] px-3 sm:h-9 sm:px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded-md bg-line/[0.05] px-3 py-0.5 font-mono text-[10px] text-muted sm:ml-4">
          {project.frameUrl ?? project.urlLabel ?? `${project.id}.local`}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <img
            data-frame-img
            src={project.image}
            alt={`${project.title} dashboard`}
            className="h-full w-full object-cover object-top"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_40%,rgb(var(--accent)/0.15),transparent_60%)]">
            <span className="display text-6xl text-ink/10 sm:text-8xl">{project.title.charAt(0)}</span>
            <span className="eyebrow">Screenshot coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
