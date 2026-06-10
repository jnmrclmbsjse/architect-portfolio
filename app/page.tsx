import { PageContainer } from "@/components/layout/PageContainer";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { getAllDecisions } from "@/lib/content/playbook";
import { HomepageClient } from "./homepage-client";

export default function Home() {
  const caseStudies = getFeaturedCaseStudies();
  const decisions = getAllDecisions();

  return (
    <PageContainer>
      <HomepageClient caseStudies={caseStudies} decisions={decisions} />
    </PageContainer>
  );
}
