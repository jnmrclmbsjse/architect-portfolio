import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PLAYBOOK_DIR = path.join(process.cwd(), "content/playbook");

export interface PlaybookDecisionMeta {
  title: string;
  slug: string;
  category: string;
  roles: string[];
  date: string;
}

export function getAllDecisions(): PlaybookDecisionMeta[] {
  const files = fs.readdirSync(PLAYBOOK_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PLAYBOOK_DIR, file), "utf-8");
      const { data } = matter(raw);
      return data as PlaybookDecisionMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
