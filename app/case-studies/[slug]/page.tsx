import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { StackTag } from "@/components/shared/StackTag";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { mdxComponents } from "@/lib/content/mdx-components";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getCaseStudy(slug);
  if (!result) return {};
  return {
    title: result.meta.title,
    description: result.meta.subtitle,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const result = getCaseStudy(slug);

  if (!result) notFound();

  const { meta, content } = result;
  const allCaseStudies = getAllCaseStudies();
  const currentIndex = allCaseStudies.findIndex((cs) => cs.slug === slug);
  const prev = currentIndex > 0 ? allCaseStudies[currentIndex - 1] : null;
  const next =
    currentIndex < allCaseStudies.length - 1
      ? allCaseStudies[currentIndex + 1]
      : null;

  return (
    <PageContainer>
      <article className="py-16">
        <div className="flex flex-col gap-4 mb-10">
          <Link
            href="/case-studies"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; All case studies
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {meta.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            {meta.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <MDXRemote source={content} components={mdxComponents} />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
            <div>
              <h2 className="text-xs font-medium text-muted-foreground mb-2">
                Domain
              </h2>
              <Badge variant="outline" className="font-mono text-[10px]">
                {meta.domain}
              </Badge>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground mb-2">
                Roles
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {meta.roles.map((role) => (
                  <Badge
                    key={role}
                    variant="secondary"
                    className="font-mono text-[10px] font-normal capitalize"
                  >
                    {role.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground mb-2">
                Stack
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {meta.stack.map((tech) => (
                  <StackTag key={tech} name={tech} />
                ))}
              </div>
            </div>

            {(prev || next) && (
              <nav className="flex flex-col gap-3 border-t border-border pt-4">
                {prev && (
                  <Link
                    href={`/case-studies/${prev.slug}`}
                    className="flex flex-col gap-0.5 text-sm hover:text-primary transition-colors"
                  >
                    <span className="text-[10px] text-muted-foreground">
                      Previous
                    </span>
                    <span className="text-xs font-medium leading-snug">
                      {prev.title}
                    </span>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/case-studies/${next.slug}`}
                    className="flex flex-col gap-0.5 text-sm hover:text-primary transition-colors"
                  >
                    <span className="text-[10px] text-muted-foreground">
                      Next
                    </span>
                    <span className="text-xs font-medium leading-snug">
                      {next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </aside>
        </div>
      </article>
    </PageContainer>
  );
}
