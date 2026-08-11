"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GlassSurface } from "@/components/system/GlassSurface";

const links = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/stylist", label: "Stylist", icon: MessageCircle },
  { href: "/community", label: "Community", icon: Users },
  { href: "/dashboard", label: "You", icon: LayoutDashboard },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <GlassSurface
        variant="nav"
        className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2 sm:px-4"
      >
        <Link href="/" className="mr-1 flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--junaki-blush)] to-[var(--junaki-crimson)] text-xs font-bold text-white shadow-[0_0_20px_var(--junaki-glow)]">
            J
          </span>
          <span className="hidden font-display text-lg text-[var(--junaki-rose-50)] sm:inline">
            Junaki
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-0.5 overflow-x-auto sm:justify-center sm:gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                  active
                    ? "bg-white/15 text-[var(--junaki-rose-50)]"
                    : "text-[var(--junaki-muted)] hover:bg-white/8 hover:text-[var(--junaki-mist)]",
                )}
              >
                <Icon size={14} className="shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </GlassSurface>
    </header>
  );
}
