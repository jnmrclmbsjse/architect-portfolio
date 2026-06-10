"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { RoleFilter } from "@/components/shared/RoleFilter";
import { ThemeToggle } from "./ThemeToggle";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ open, onOpenChange, links }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col px-4">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Filter by role</span>
            <RoleFilter />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
