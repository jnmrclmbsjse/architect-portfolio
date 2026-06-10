import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { getAllDecisions } from "@/lib/content/playbook";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://junmarjose.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllCaseStudies().map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
  }));

  const playbook = getAllDecisions().map((d) => ({
    url: `${siteUrl}/playbook/${d.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/playbook`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    ...caseStudies,
    ...playbook,
  ];
}
