"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "./PageContainer";
import { ThemeToggle } from "./ThemeToggle";
import { RoleFilter } from "@/components/shared/RoleFilter";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/playbook", label: "Playbook" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <PageContainer>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            Junmar Jose
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Suspense fallback={null}>
              <RoleFilter />
            </Suspense>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </PageContainer>

      <MobileMenu
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        links={navLinks}
      />
    </header>
  );
}
