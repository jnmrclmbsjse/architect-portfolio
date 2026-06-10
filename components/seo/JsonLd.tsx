export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Junmar Jose",
    jobTitle: "Software Architect & Technical Lead",
    url: "https://junmarjose.com",
    sameAs: [
      "https://linkedin.com/in/junmarjose",
      "https://github.com/jnmrclmbsjse",
    ],
    knowsAbout: [
      "Software Architecture",
      "Technical Leadership",
      "Full Stack Development",
      "E-commerce Integration",
      "SaaS Development",
      "Scrum",
      "PHP",
      "React",
      "Next.js",
      "TypeScript",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bataan Peninsula State University",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Junmar Jose",
    url: "https://junmarjose.com",
    description:
      "I design systems, lead teams, and build full-stack products from idea to production.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
