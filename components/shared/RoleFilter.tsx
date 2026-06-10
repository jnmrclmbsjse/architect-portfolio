"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoleFilter } from "@/hooks/useRoleFilter";
import { roles, getRoleBySlug } from "@/lib/roles";

export function RoleFilter() {
  const { selectedRole, setRole } = useRoleFilter();
  const current = selectedRole ? getRoleBySlug(selectedRole) : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-input bg-background px-3 py-1.5 font-mono text-xs transition-colors hover:bg-accent hover:text-accent-foreground">
        {current ? current.shortLabel : "All Roles"}
        <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem onClick={() => setRole(null)}>
          All Roles
        </DropdownMenuItem>
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.slug}
            onClick={() => setRole(role.slug)}
            className="whitespace-nowrap"
          >
            {role.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
