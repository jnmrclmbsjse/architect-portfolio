import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer>
      <section className="flex flex-col items-center justify-center py-32 text-center">
        <span className="font-heading text-6xl font-bold text-muted-foreground/25">
          404
        </span>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Back to home
        </Link>
      </section>
    </PageContainer>
  );
}
