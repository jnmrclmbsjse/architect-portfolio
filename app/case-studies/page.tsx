import { PageContainer } from "@/components/layout/PageContainer";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { CaseStudiesList } from "./case-studies-client";

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <PageContainer>
      <section className="py-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Case Studies
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Real projects, real constraints, real outcomes. Each case study
            covers what was built, why decisions were made, and what I learned.
          </p>
        </div>
        <CaseStudiesList caseStudies={caseStudies} />
      </section>
    </PageContainer>
  );
}
