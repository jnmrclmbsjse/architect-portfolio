import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyMeta {
  title: string;
  subtitle: string;
  slug: string;
  roles: string[];
  stack: string[];
  domain: string;
  featured: boolean;
  order: Record<string, number>;
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8");
    const { data } = matter(raw);
    return data as CaseStudyMeta;
  });
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudies().filter((cs) => cs.featured);
}

export function getCaseStudy(slug: string): { meta: CaseStudyMeta; content: string } | null {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    if ((data as CaseStudyMeta).slug === slug) {
      return { meta: data as CaseStudyMeta, content };
    }
  }

  return null;
}
