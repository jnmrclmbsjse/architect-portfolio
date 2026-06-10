"use client";

import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { useRoleFilter } from "@/hooks/useRoleFilter";
import { type CaseStudyMeta } from "@/lib/content/case-studies";

interface CaseStudiesListProps {
  caseStudies: CaseStudyMeta[];
}

export function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const { selectedRole } = useRoleFilter();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {caseStudies.map((cs) => {
        const matches = !selectedRole || cs.roles.includes(selectedRole);
        return (
          <CaseStudyCard
            key={cs.slug}
            caseStudy={cs}
            className={matches ? undefined : "opacity-35"}
          />
        );
      })}
    </div>
  );
}
