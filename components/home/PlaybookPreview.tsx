"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
  const shown = filtered.slice(0, 3);

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
      <div className="grid gap-4 md:grid-cols-3">
        {shown.map((decision, i) => (
          <motion.div
            key={decision.slug}
            className="flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:border-primary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Badge
              variant="outline"
              className="w-fit font-mono text-[10px] capitalize"
            >
              {decision.category.replace("-", " ")}
            </Badge>
            <h3 className="font-heading text-sm font-medium leading-snug">
              {decision.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
