"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HowIWorkCardProps {
  title: string;
  subtitle: string;
  description: string;
  signals: string[];
  index: number;
}

export function HowIWorkCard({
  title,
  subtitle,
  description,
  signals,
  index,
}: HowIWorkCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-0 py-8 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b border-border"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 }}
    >
      <span className="font-heading text-5xl font-bold text-muted-foreground/25 row-span-3 self-start leading-none">
        {stepNumber}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <p className="col-start-2 mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="col-start-2 mt-3 flex flex-wrap gap-1.5">
        {signals.map((signal) => (
          <Badge
            key={signal}
            variant="secondary"
            className="font-mono text-[10px] font-normal"
          >
            {signal}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
