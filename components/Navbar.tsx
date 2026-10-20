"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/constants/colors";

// colors.ts ke values se CSS variables (alpha shades hex suffix se)
const themeVars = {
  "--primary":       colors.primary,
  "--primary-hover": colors.primaryHover,
  "--primary-20":    `${colors.primary}33`, // 20%
  "--primary-10":    `${colors.primary}1A`, // 10%
  "--primary-5":     `${colors.primary}0D`, // 5%
  "--white":         colors.white,
  "--black":         colors.black,
  "--black-70":      `${colors.black}B3`,   // 70%
  "--black-50":      `${colors.black}80`,   // 50%
  "--black-40":      `${colors.black}66`,   // 40%
  "--black-30":      `${colors.black}4D`,   // 30%
} as CSSProperties;

const NAV_LINKS = [
  { label: "Home",            href: "/"                },
  { label: "Docs",            href: "/docs"            },
  { label: "Custom Response", href: "/custom-response" },
];

const SUB_LINKS = [
  { label: "/products", href: "/docs/products"  },
  { label: "/users",    href: "/docs/users"     },
  { label: "/posts",    href: "/docs/posts"     },
  { label: "/carts",    href: "/docs/carts"     },
  { label: "/todos",    href: "/docs/todos"     },
  { label: "/quotes",   href: "/docs/quotes"    },
  { label: "/recipes",  href: "/docs/recipes"   },
  { label: "/comments", href: "/docs/comments"  },
  { label: "/auth",     href: "/docs/auth-login"},
  { label: "/image",    href: "/docs/image"     },
  { label: "/http",     href: "/docs/http"      },
  { label: "/ip",       href: "/docs/ip"        },
];

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={themeVars}
      className="sticky top-0 z-50 w-full bg-[var(--white)]"
    >

      {/* Main nav */}
      <nav className="h-[72px] px-8 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <span className="font-mono text-[13px] text-[color:var(--white)] font-bold tracking-tight">FF</span>
          </div>
          <span className="text-[20px] font-semibold tracking-tight">
            <span className="text-[color:var(--black)]">Fake</span>
            <span className="text-[color:var(--primary)]">Forge</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center rounded-full border border-[color:var(--primary-20)] bg-[var(--primary-5)] p-1 gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-150",
                isActive(link.href)
                  ? "bg-[var(--white)] text-[color:var(--primary)] shadow-sm border border-[color:var(--primary-20)]"
                  : "text-[color:var(--black-50)] hover:text-[color:var(--primary)]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <a
            href="https://github.com/mrvornex/FakeForge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[15px] text-[color:var(--black-70)] hover:text-[color:var(--primary)] transition-colors"
          >
            <GithubIcon />
            GitHub
          </a>
          <div className="w-px h-5 bg-[var(--primary-20)]" />
          <Link
            href="/docs"
            className="text-[15px] font-medium text-[color:var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-5 py-2.5 rounded-lg transition-colors"
          >
            Try API →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-[color:var(--black-70)] hover:text-[color:var(--primary)] p-1"
          aria-label="Toggle menu"
        >
          {open
            ? <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </nav>

      {/* Divider */}
      <div className="border-b border-[color:var(--primary-10)]" />

      {/* Sub nav */}
      <div className="bg-[var(--white)] px-8 h-12 flex items-center gap-1 overflow-x-auto scrollbar-none max-w-7xl mx-auto">
        <span className="text-[13px] text-[color:var(--black-30)] font-mono mr-2 flex-shrink-0">endpoints:</span>
        {SUB_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "font-mono text-[13px] px-3 py-1.5 rounded-md whitespace-nowrap transition-all duration-150 flex-shrink-0",
              pathname === link.href
                ? "text-[color:var(--primary)] bg-[var(--primary-10)] font-medium"
                : "text-[color:var(--black-40)] hover:text-[color:var(--primary)] hover:bg-[var(--primary-5)]",
            ].join(" ")}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Bottom border */}
      <div className="border-b border-[color:var(--primary-10)]" />

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--white)] border-b border-[color:var(--primary-20)] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={[
                "px-3 py-3 rounded-lg text-[16px] transition-all",
                isActive(link.href)
                  ? "text-[color:var(--primary)] bg-[var(--primary-10)] font-medium"
                  : "text-[color:var(--black-50)] hover:text-[color:var(--primary)]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[color:var(--primary-10)] mt-3 pt-3 flex gap-2">
            <a
              href="https://github.com/mrvornex/FakeForge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 text-[15px] text-[color:var(--black-70)] border border-[color:var(--primary-20)] px-3 py-2.5 rounded-lg"
            >
              <GithubIcon /> GitHub
            </a>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="flex-1 flex items-center justify-center text-[15px] font-medium text-[color:var(--white)] bg-[var(--primary)] px-3 py-2.5 rounded-lg"
            >
              Try API →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}