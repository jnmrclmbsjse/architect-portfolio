"use client";

import Link from "next/link";
import { useRoleFilter } from "@/hooks/useRoleFilter";
import { type PlaybookDecisionMeta } from "@/lib/content/playbook";

interface PlaybookListProps {
  decisions: PlaybookDecisionMeta[];
}

export function PlaybookList({ decisions }: PlaybookListProps) {
  const { selectedRole } = useRoleFilter();

  return (
    <div className="border-t border-border">
      {decisions.map((decision) => {
        const matches = !selectedRole || decision.roles.includes(selectedRole);
        return (
          <Link
            key={decision.slug}
            href={`/playbook/${decision.slug}`}
            className={`group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors ${
              matches ? "" : "opacity-35"
            }`}
          >
            <h2 className="font-heading text-sm font-medium leading-snug group-hover:text-primary transition-colors">
              {decision.title}
            </h2>
            <span className="shrink-0 text-xs text-muted-foreground capitalize">
              {decision.category.replace("-", " ")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
