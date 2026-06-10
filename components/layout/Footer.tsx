import Link from "next/link";
import { PageContainer } from "./PageContainer";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <PageContainer>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-lg font-semibold">
              Looking for an architect who still writes code?
            </h3>
            <p className="text-sm text-muted-foreground">
              Open to Technical Lead, Solutions Architect, and senior engineering
              roles.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="mailto:jose.junmar@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/junmarjose"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jnmrclmbsjse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              href="/resume.pdf"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </Link>
          </div>

          <Separator />

          <p className="text-xs text-muted-foreground">
            &copy; 2026 Junmar Jose
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
