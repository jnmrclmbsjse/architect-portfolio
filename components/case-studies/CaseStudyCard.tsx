import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StackTag } from "@/components/shared/StackTag";
import { type CaseStudyMeta } from "@/lib/content/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudyMeta;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function CaseStudyCard({
  caseStudy,
  variant = "default",
  className,
}: CaseStudyCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="group flex flex-col gap-5 rounded-lg border border-border p-8 transition-colors hover:border-primary/50"
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">
            {caseStudy.domain}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-prose">
            {caseStudy.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.stack.slice(0, 6).map((tech) => (
            <StackTag key={tech} name={tech} />
          ))}
          {caseStudy.stack.length > 6 && (
            <Badge
              variant="secondary"
              className="font-mono text-[10px] font-normal"
            >
              +{caseStudy.stack.length - 6}
            </Badge>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="group flex h-full flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:border-primary/50"
      >
        <Badge variant="outline" className="w-fit font-mono text-[10px]">
          {caseStudy.domain}
        </Badge>
        <h3 className="font-heading text-sm font-medium leading-snug group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {caseStudy.stack.slice(0, 3).map((tech) => (
            <StackTag key={tech} name={tech} />
          ))}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={cn("group flex flex-col gap-4 rounded-lg border border-border p-6 transition-colors hover:border-primary/50", className)}
    >
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-mono text-[10px]">
          {caseStudy.domain}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-base font-semibold group-hover:text-primary transition-colors">
          {caseStudy.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {caseStudy.subtitle}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {caseStudy.stack.slice(0, 4).map((tech) => (
          <StackTag key={tech} name={tech} />
        ))}
        {caseStudy.stack.length > 4 && (
          <Badge
            variant="secondary"
            className="font-mono text-[10px] font-normal"
          >
            +{caseStudy.stack.length - 4}
          </Badge>
        )}
      </div>
    </Link>
  );
}
