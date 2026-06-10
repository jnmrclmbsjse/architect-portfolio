"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type RoleSlug, roles, getRoleBySlug } from "@/lib/roles";
import { useRoleFilter } from "@/hooks/useRoleFilter";

export function HeroSection() {
  const { selectedRole, setRole } = useRoleFilter();
  const role = selectedRole ? getRoleBySlug(selectedRole) : null;
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const };

  const entrance = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
        };

  return (
    <section className="py-24 sm:py-32">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <motion.h1
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            {...entrance(0)}
          >
            Junmar Jose
          </motion.h1>

          <motion.div className="min-h-[3.5rem] sm:min-h-[4rem]" {...entrance(0.1)}>
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedRole ?? "default"}
                className="max-w-3xl text-lg text-muted-foreground sm:text-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transition}
              >
                {role
                  ? `As your ${role.label}, ${role.description.charAt(0).toLowerCase()}${role.description.slice(1)}.`
                  : "I design systems, lead teams, and build full-stack products from idea to production."}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div className="flex flex-col gap-3" {...entrance(0.2)}>
          <p className="text-sm text-muted-foreground">
            {selectedRole ? "Viewing as:" : "What role are you hiring for?"}
          </p>

          <div className="flex flex-wrap gap-2">
            {roles.map((r) => {
              const isActive = selectedRole === r.slug;
              return (
                <button
                  key={r.slug}
                  onClick={() => setRole(isActive ? null : r.slug)}
                  className={`min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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

          <AnimatePresence>
            {selectedRole && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                onClick={() => setRole(null)}
                className="self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear filter
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
