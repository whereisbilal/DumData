"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "@/constants/colors";

interface SideItem {
  label: string;
  href: string;
  count?: string;
}

interface SideSection {
  title: string;
  items: SideItem[];
}

const SECTIONS: SideSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction",   href: "/docs" },
      { label: "Authentication", href: "/docs/auth-login" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Products", href: "/docs/products", count: "194" },
      { label: "Users",    href: "/docs/users",    count: "208" },
      { label: "Posts",    href: "/docs/posts",    count: "251" },
      { label: "Comments", href: "/docs/comments", count: "340" },
      { label: "Todos",    href: "/docs/todos",    count: "254" },
      { label: "Carts",    href: "/docs/carts",    count: "20"  },
      { label: "Quotes",   href: "/docs/quotes",   count: "100" },
      { label: "Recipes",  href: "/docs/recipes",  count: "50"  },
    ],
  },
  {
    title: "Special",
    items: [
      { label: "Dynamic Image", href: "/docs/image" },
      { label: "Mock HTTP",     href: "/docs/http" },
      { label: "IP Address",    href: "/docs/ip" },
    ],
  },
];

// Mobile ke liye saare links ek hi list mein
const ALL_ITEMS = SECTIONS.flatMap((s) => s.items);

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: upar ek patti jo side mein scroll hoti hai */}
      <nav
     className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        {ALL_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-[14px] border"
              style={{
                background: active ? colors.primary : colors.white,
                color: active ? colors.white : colors.black,
                borderColor: active ? colors.primary : colors.border,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop / tablet: left sidebar */}
      <aside
        className="hidden md:block w-[220px] lg:w-[240px] flex-shrink-0 sticky top-[122px] h-[calc(100vh-122px)] overflow-y-auto"
        style={{ borderRight: `1px solid ${colors.border}` }}
      >
        <nav className="py-5">
          {SECTIONS.map((section) => (
            <div key={section.title} className="px-3 mb-3">
              <p
                className="font-mono text-[12px] tracking-widest uppercase px-2 py-2.5"
                style={{ color: colors.primary }}
              >
                {section.title}
              </p>

              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg mb-0.5 hover:opacity-70 transition-opacity"
                    style={{ background: active ? colors.primaryLight : "transparent" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: active ? colors.primary : colors.borderStrong }}
                    />
                    <span
                      className="text-[15px] flex-1"
                      style={{
                        color: active ? colors.primary : colors.black,
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="font-mono text-[12px]" style={{ color: colors.textMuted }}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}