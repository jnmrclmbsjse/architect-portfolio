"use client";

import { useRoleFilter } from "@/hooks/useRoleFilter";
import { HeroSection, RoleFilterSection } from "@/components/home/HeroSection";
import { ProofBar } from "@/components/home/ProofBar";
import { HowIWork } from "@/components/home/HowIWork";
import { FeaturedCaseStudies } from "@/components/home/FeaturedCaseStudies";
import { PlaybookPreview } from "@/components/home/PlaybookPreview";
import { TechStackSection } from "@/components/home/TechStackSection";
import { type CaseStudyMeta } from "@/lib/content/case-studies";
import { type PlaybookDecisionMeta } from "@/lib/content/playbook";

interface HomepageClientProps {
  caseStudies: CaseStudyMeta[];
  decisions: PlaybookDecisionMeta[];
}

export function HomepageClient({ caseStudies, decisions }: HomepageClientProps) {
  const { selectedRole } = useRoleFilter();

  return (
    <>
      <HeroSection />
      <ProofBar />
      <RoleFilterSection />
      <HowIWork selectedRole={selectedRole} />
      <FeaturedCaseStudies
        caseStudies={caseStudies}
        selectedRole={selectedRole}
      />
      <PlaybookPreview decisions={decisions} selectedRole={selectedRole} />
      <TechStackSection />
    </>
  );
}
