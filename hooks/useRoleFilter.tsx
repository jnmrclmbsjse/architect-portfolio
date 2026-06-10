"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type RoleSlug, getRoleBySlug } from "@/lib/roles";

const STORAGE_KEY = "portfolio-role";

interface RoleFilterContextValue {
  selectedRole: RoleSlug | null;
  setRole: (role: RoleSlug | null) => void;
  isFiltered: boolean;
}

const RoleFilterContext = createContext<RoleFilterContextValue>({
  selectedRole: null,
  setRole: () => {},
  isFiltered: false,
});

export function RoleFilterProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<RoleSlug | null>(null);

  useEffect(() => {
    const urlRole = new URLSearchParams(window.location.search).get("role");
    const validUrlRole =
      urlRole && getRoleBySlug(urlRole) ? (urlRole as RoleSlug) : null;

    const stored = localStorage.getItem(STORAGE_KEY);
    const validStored =
      stored && getRoleBySlug(stored) ? (stored as RoleSlug) : null;

    const initial = validUrlRole ?? validStored;
    if (initial) setSelectedRole(initial);
  }, []);

  const setRole = useCallback((role: RoleSlug | null) => {
    setSelectedRole(role);
    if (role) {
      localStorage.setItem(STORAGE_KEY, role);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <RoleFilterContext.Provider
      value={{ selectedRole, setRole, isFiltered: selectedRole !== null }}
    >
      {children}
    </RoleFilterContext.Provider>
  );
}

export function useRoleFilter() {
  return useContext(RoleFilterContext);
}
