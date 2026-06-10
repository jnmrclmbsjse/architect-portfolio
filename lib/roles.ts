export type RoleSlug =
  | "software-architect"
  | "solutions-architect"
  | "technical-lead"
  | "scrum-master"
  | "senior-fullstack";

export type HowIWorkMode = "architect" | "lead" | "build";

export interface RoleDefinition {
  slug: RoleSlug;
  label: string;
  shortLabel: string;
  description: string;
  howIWorkOrder: HowIWorkMode[];
}

export const roles: RoleDefinition[] = [
  {
    slug: "software-architect",
    label: "Software Architect",
    shortLabel: "Architect",
    description: "Designing scalable systems and making high-impact technical decisions",
    howIWorkOrder: ["architect", "lead", "build"],
  },
  {
    slug: "solutions-architect",
    label: "Solutions Architect",
    shortLabel: "Solutions",
    description: "Bridging business needs with technical implementation across platforms",
    howIWorkOrder: ["architect", "build", "lead"],
  },
  {
    slug: "technical-lead",
    label: "Technical Lead",
    shortLabel: "Tech Lead",
    description: "Guiding engineering teams through complex deliveries",
    howIWorkOrder: ["lead", "architect", "build"],
  },
  {
    slug: "scrum-master",
    label: "Scrum Master",
    shortLabel: "Scrum Master",
    description: "Facilitating agile processes and removing blockers for high-performing teams",
    howIWorkOrder: ["lead", "build", "architect"],
  },
  {
    slug: "senior-fullstack",
    label: "Senior Full Stack Developer",
    shortLabel: "Full Stack",
    description: "Building end-to-end products from database to deployment",
    howIWorkOrder: ["build", "architect", "lead"],
  },
];

export function getRoleBySlug(slug: string): RoleDefinition | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getContentOrder<T extends { order?: Record<string, number> }>(
  role: RoleSlug | null,
  items: T[]
): T[] {
  if (!role) return items;
  return [...items].sort((a, b) => {
    const orderA = a.order?.[role] ?? 99;
    const orderB = b.order?.[role] ?? 99;
    return orderA - orderB;
  });
}
