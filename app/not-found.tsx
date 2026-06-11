import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const suggestions = [
  { href: "/case-studies", label: "Case Studies", description: "Real projects, real outcomes" },
  { href: "/playbook", label: "Playbook", description: "Architecture decisions explained" },
  { href: "/about", label: "About", description: "9+ years of career context" },
  { href: "/contact", label: "Contact", description: "Get in touch directly" },
];

export default function NotFound() {
  return (
    <PageContainer>
      <section className="py-24 sm:py-32">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-muted-foreground">404</span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Nothing here
          </h1>
          <p className="text-sm text-muted-foreground max-w-prose">
            This page doesn't exist. It may have been moved, or the URL might be wrong.
          </p>
        </div>

        <div className="border-t border-border">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors"
            >
              <span className="font-heading text-sm font-medium group-hover:text-primary transition-colors">
                {s.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {s.description}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
