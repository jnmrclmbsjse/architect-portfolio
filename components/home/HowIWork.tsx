"use client";

import { type RoleSlug, getRoleBySlug } from "@/lib/roles";
import { HowIWorkCard } from "./HowIWorkCard";
import howIWorkData from "@/content/how-i-work.json";

type HowIWorkMode = "architect" | "lead" | "build";

interface HowIWorkProps {
  selectedRole: RoleSlug | null;
}

export function HowIWork({ selectedRole }: HowIWorkProps) {
  const role = selectedRole ? getRoleBySlug(selectedRole) : null;
  const order: HowIWorkMode[] = role
    ? role.howIWorkOrder
    : ["architect", "lead", "build"];

  const cards = order.map((mode) => ({
    key: mode,
    ...howIWorkData[mode],
  }));

  return (
    <section className="py-16">
      <h2 className="font-heading text-2xl font-semibold mb-8">How I Work</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <HowIWorkCard
            key={card.key}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            signals={card.signals}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
