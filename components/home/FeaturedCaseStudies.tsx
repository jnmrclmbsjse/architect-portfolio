"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  const [featured, ...rest] = ordered;
  const shouldReduceMotion = useReducedMotion();

  if (!featured) return null;

  return (
    <section className="py-16">
      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-heading text-2xl font-semibold">Selected Work</h2>
        <Link
          href="/case-studies"
          className="shrink-0 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
        >
          View all <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <motion.div
          key={featured.slug}
          layout
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
        >
          <CaseStudyCard caseStudy={featured} variant="featured" />
        </motion.div>
        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((cs, i) => (
              <motion.div
                key={cs.slug}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: (i + 1) * 0.1 }}
              >
                <CaseStudyCard caseStudy={cs} variant="compact" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
