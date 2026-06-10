"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type RoleSlug, getContentOrder } from "@/lib/roles";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { type CaseStudyMeta } from "@/lib/content/case-studies";

interface FeaturedCaseStudiesProps {
  caseStudies: CaseStudyMeta[];
  selectedRole: RoleSlug | null;
}

export function FeaturedCaseStudies({
  caseStudies,
  selectedRole,
}: FeaturedCaseStudiesProps) {
  const ordered = getContentOrder(selectedRole, caseStudies);

  return (
    <section className="py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-heading text-2xl font-semibold">Selected Work</h2>
        <Link
          href="/case-studies"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {ordered.map((cs, i) => (
          <motion.div
            key={cs.slug}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <CaseStudyCard caseStudy={cs} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
