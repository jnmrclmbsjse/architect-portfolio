import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StackTag } from "@/components/shared/StackTag";
import { type CaseStudyMeta } from "@/lib/content/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudyMeta;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group flex flex-col gap-4 rounded-lg border border-border p-6 transition-colors hover:border-primary/50"
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
          <Badge variant="secondary" className="font-mono text-[10px] font-normal">
            +{caseStudy.stack.length - 4}
          </Badge>
        )}
      </div>
    </Link>
  );
}
