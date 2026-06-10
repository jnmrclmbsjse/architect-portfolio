"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "9+", label: "years in IT" },
  { value: "8+", label: "platforms integrated" },
  { value: "11", label: "largest team led" },
  { value: "30+", label: "webshops connected" },
];

const domains = ["SaaS", "E-commerce", "AI", "CRM"];

export function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-12 border-y border-border">
      <motion.div
        className="flex flex-col gap-6"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {stats.map((stat, i) => (
            <span key={stat.label} className="flex items-center gap-x-4">
              <span>
                <span className="font-semibold text-foreground">{stat.value}</span>
                {" "}{stat.label}
              </span>
              {i < stats.length - 1 && (
                <span className="hidden sm:inline text-border" aria-hidden="true">&middot;</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <Badge key={domain} variant="outline" className="font-mono text-xs">
              {domain}
            </Badge>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
