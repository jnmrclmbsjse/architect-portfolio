import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-heading text-xl font-semibold mt-10 mb-4 first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-heading text-base font-semibold mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-sm text-muted-foreground leading-relaxed mb-4"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mb-4 ml-4 list-disc space-y-2 text-sm text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-4 list-decimal space-y-2 text-sm text-muted-foreground" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
};
