"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { type RoleSlug, getRoleBySlug } from "@/lib/roles";

export function useRoleFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const param = searchParams.get("role");
  const selectedRole = param && getRoleBySlug(param) ? (param as RoleSlug) : null;

  const setRole = useCallback(
    (role: RoleSlug | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (role) {
        params.set("role", role);
      } else {
        params.delete("role");
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  return {
    selectedRole,
    setRole,
    isFiltered: selectedRole !== null,
  };
}
