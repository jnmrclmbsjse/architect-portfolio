"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "9+", label: "Years in IT" },
  { value: "8+", label: "Platforms Integrated" },
  { value: "11", label: "Largest Team Led" },
  { value: "30+", label: "Webshops Connected" },
];

const domains = ["SaaS", "E-commerce", "AI", "CRM"];

export function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-12 border-y border-border">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-1"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.1 }}
            >
              <span className="font-heading text-3xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <Badge key={domain} variant="outline" className="font-mono text-xs">
              {domain}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
