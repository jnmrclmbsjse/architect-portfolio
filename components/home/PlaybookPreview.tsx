"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type RoleSlug } from "@/lib/roles";
import { type PlaybookDecisionMeta } from "@/lib/content/playbook";

interface PlaybookPreviewProps {
  decisions: PlaybookDecisionMeta[];
  selectedRole: RoleSlug | null;
}

export function PlaybookPreview({
  decisions,
  selectedRole,
}: PlaybookPreviewProps) {
  const filtered = selectedRole
    ? decisions.filter((d) => d.roles.includes(selectedRole))
    : decisions;
  const shown = filtered.slice(0, 5);

  return (
    <section className="py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-heading text-2xl font-semibold">
          How I Think About Complex Problems
        </h2>
        <Link
          href="/playbook"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="border-t border-border">
        {shown.map((decision, i) => (
          <motion.div
            key={decision.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              href={`/playbook/${decision.slug}`}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors"
            >
              <h3 className="font-heading text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                {decision.title}
              </h3>
              <span className="shrink-0 text-xs text-muted-foreground capitalize">
                {decision.category.replace("-", " ")}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
