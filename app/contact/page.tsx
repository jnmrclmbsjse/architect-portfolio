import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Junmar Jose. Open to architecture consulting, technical leadership roles, and engineering challenges.",
};

const contactLinks = [
  {
    label: "Email",
    value: "jose.junmar@gmail.com",
    href: "mailto:jose.junmar@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/jnmrclmbsjse",
    href: "https://github.com/jnmrclmbsjse",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/junmarjose",
    href: "https://www.linkedin.com/in/junmarjose",
  },
];

export default function ContactPage() {
  return (
    <PageContainer>
      <section className="py-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Contact
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Open to architecture consulting, technical leadership roles, and
            engineering challenges where the problem is worth solving.
          </p>
        </div>

        <div className="border-t border-border">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors"
            >
              <span className="text-sm text-muted-foreground">
                {link.label}
              </span>
              <span className="font-heading text-sm font-medium group-hover:text-primary transition-colors">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-6">
            <h2 className="font-heading text-sm font-semibold mb-2">
              Availability
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based in the Philippines. Available for remote engagements
              across European and overlapping time zones.
            </p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <h2 className="font-heading text-sm font-semibold mb-2">
              What I'm looking for
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Roles where I own architecture decisions and still ship code.
              Teams that value clear documentation and honest trade-off
              conversations over hype cycles.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            Want to learn more before reaching out? Press{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              ?
            </kbd>{" "}
            to ask the AI chat anything about my experience.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
