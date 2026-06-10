"use client";

import { type ReactNode } from "react";
import { RoleFilterProvider } from "@/hooks/useRoleFilter";

export function Providers({ children }: { children: ReactNode }) {
  return <RoleFilterProvider>{children}</RoleFilterProvider>;
}
