"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import techStackData from "@/content/tech-stack.json";

const categoryLabels: Record<string, string> = {
  backend: "Backend",
  frontend: "Frontend & Mobile",
  mobile: "Mobile",
  infrastructure: "Infrastructure",
  database: "Database",
  integration: "Integrations",
};

const confidenceStyles: Record<string, string> = {
  expert: "border-primary/50 text-primary",
  proficient: "border-border text-muted-foreground",
  familiar: "border-dashed border-border text-muted-foreground",
};

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const categories = Object.entries(techStackData).filter(
    ([key]) => key !== "mobile"
  );

  return (
    <section ref={ref} className="py-16">
      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-heading text-2xl font-semibold">Tech Stack</h2>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-6 rounded-sm border border-primary/50" />
            expert
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-6 rounded-sm border border-border" />
            proficient
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-6 rounded-sm border border-dashed border-border" />
            familiar
          </span>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(([key, techs], catIdx) => (
          <motion.div
            key={key}
            className="flex flex-col gap-3"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: catIdx * 0.08 }}
          >
            <h3 className="text-xs font-medium text-muted-foreground">
              {categoryLabels[key] || key}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(techs as { name: string; confidence: string }[]).map((tech) => (
                <Badge
                  key={tech.name}
                  variant="outline"
                  aria-label={`${tech.name}, ${tech.confidence} level`}
                  className={cn(
                    "font-mono text-[11px] font-normal",
                    confidenceStyles[tech.confidence]
                  )}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
