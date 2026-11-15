import { cn } from "@/lib/utils";

export default function SectionLabel({ index, title, className }: { index: string; title: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs text-accent">{index}</span>
      <span className="h-px w-10 bg-line/20" />
      <span className="eyebrow">{title}</span>
    </div>
  );
}
