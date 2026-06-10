import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import experienceData from "@/content/experience.json";

interface Experience {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  highlights: string[];
  stack: string[];
  teamSize: number | null;
  domain: string;
}

const experience = experienceData as Experience[];

export default function AboutPage() {
  return (
    <PageContainer>
      <section className="py-16">
        <div className="flex flex-col gap-2 mb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            About
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Software architect and technical lead with 9+ years building
            systems under real constraints, across SaaS, e-commerce, AI, and
            mobile, in the Netherlands, UK, Australia, and the Philippines.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-heading text-xl font-semibold mb-8">
            Career Timeline
          </h2>
          <div className="border-t border-border">
            {experience.map((exp, i) => (
              <div
                key={`${exp.company}-${i}`}
                className="grid grid-cols-1 gap-4 border-b border-border py-6 md:grid-cols-[200px_1fr]"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    {exp.period}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                      <span className="mx-2 text-border">|</span>
                      {exp.location}
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    {exp.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.slice(0, 5).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-[10px] font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {exp.teamSize && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px]"
                      >
                        Team of {exp.teamSize}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold">
            Get in touch
          </h2>
          <p className="text-sm text-muted-foreground max-w-prose">
            I'm open to architecture consulting, technical leadership roles, and
            interesting engineering challenges.
          </p>
          <div>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:underline"
            >
              Contact me &rarr;
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
