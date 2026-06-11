"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type RoleSlug, roles, getRoleBySlug } from "@/lib/roles";
import { useRoleFilter } from "@/hooks/useRoleFilter";

export function HeroSection() {
  const { selectedRole } = useRoleFilter();
  const role = selectedRole ? getRoleBySlug(selectedRole) : null;
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const };

  return (
    <section className="py-24 sm:py-32">
      <div className="flex flex-col gap-4">
        <h1 className="hero-entrance hero-entrance-1 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Junmar Jose
        </h1>

        <div className="hero-entrance hero-entrance-2 min-h-[3.5rem] sm:min-h-[4rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={selectedRole ?? "default"}
              className="max-w-3xl text-lg text-muted-foreground sm:text-xl"
              initial={hasMounted.current ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
            >
              {role
                ? `As your ${role.label}, ${role.description.charAt(0).toLowerCase()}${role.description.slice(1)}.`
                : "I design systems, lead teams, and build full-stack products from idea to production."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function RoleFilterSection() {
  const { selectedRole, setRole } = useRoleFilter();
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const };

  return (
    <section className="py-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          {selectedRole ? "Viewing as:" : "What role are you hiring for?"}
        </p>

        <div
          className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0"
          role="radiogroup"
          aria-label="Filter by role"
        >
          {roles.map((r) => {
            const isActive = selectedRole === r.slug;
            return (
              <button
                key={r.slug}
                onClick={() => setRole(isActive ? null : r.slug)}
                role="radio"
                aria-checked={isActive}
                className={`shrink-0 min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {selectedRole ? (
            <motion.button
              key="clear"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={transition}
              onClick={() => setRole(null)}
              className="self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear filter
            </motion.button>
          ) : (
            <motion.p
              key="hint"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={transition}
              className="text-xs text-muted-foreground"
            >
              Selecting a role reorders the page to highlight relevant experience.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
