import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { getAllDecisions } from "@/lib/content/playbook";
import { PlaybookList } from "./playbook-client";

export const metadata: Metadata = {
  title: "The Playbook",
  description:
    "Architecture decisions explained as questions. Why webhook over polling? Why Scrumban over pure Scrum? Real reasoning from real projects.",
};

export default function PlaybookPage() {
  const decisions = getAllDecisions();

  const categories = Array.from(
    new Set(decisions.map((d) => d.category))
  ).sort();

  return (
    <PageContainer>
      <section className="py-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Architecture Playbook
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Architecture decisions I've made on real projects, documented as
            questions. Each entry covers the context, the decision, and the
            consequences.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className="font-mono text-[10px] capitalize"
            >
              {cat.replace("-", " ")}
            </Badge>
          ))}
        </div>

        <PlaybookList decisions={decisions} />
      </section>
    </PageContainer>
  );
}
