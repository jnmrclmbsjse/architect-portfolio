import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { getAllDecisions, getDecision } from "@/lib/content/playbook";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { mdxComponents } from "@/lib/content/mdx-components";

interface PlaybookEntryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDecisions().map((d) => ({ slug: d.slug }));
}

export default async function PlaybookEntryPage({
  params,
}: PlaybookEntryPageProps) {
  const { slug } = await params;
  const result = getDecision(slug);

  if (!result) notFound();

  const { meta, content } = result;
  const allDecisions = getAllDecisions();
  const currentIndex = allDecisions.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? allDecisions[currentIndex - 1] : null;
  const next =
    currentIndex < allDecisions.length - 1
      ? allDecisions[currentIndex + 1]
      : null;

  const allCaseStudies = getAllCaseStudies();
  const relatedStudies = (meta.relatedCaseStudies ?? [])
    .map((csSlug) => allCaseStudies.find((cs) => cs.slug === csSlug))
    .filter(Boolean);

  return (
    <PageContainer>
      <article className="py-16">
        <div className="flex flex-col gap-4 mb-10">
          <Link
            href="/playbook"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; All decisions
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {meta.title}
          </h1>
          <time className="text-xs text-muted-foreground">
            {new Date(meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </time>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <MDXRemote source={content} components={mdxComponents} />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
            <div>
              <h2 className="text-xs font-medium text-muted-foreground mb-2">
                Category
              </h2>
              <Badge
                variant="outline"
                className="font-mono text-[10px] capitalize"
              >
                {meta.category.replace("-", " ")}
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

            {relatedStudies.length > 0 && (
              <div>
                <h2 className="text-xs font-medium text-muted-foreground mb-2">
                  Related
                </h2>
                <div className="flex flex-col gap-1.5">
                  {relatedStudies.map((cs) => (
                    <Link
                      key={cs!.slug}
                      href={`/case-studies/${cs!.slug}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors leading-snug"
                    >
                      {cs!.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(prev || next) && (
              <nav className="flex flex-col gap-3 border-t border-border pt-4">
                {prev && (
                  <Link
                    href={`/playbook/${prev.slug}`}
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
                    href={`/playbook/${next.slug}`}
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
