import Link from "next/link";
import { colors } from "@/constants/colors";

const RESOURCE_LINKS = [
  { label: "Products", href: "/docs/products" },
  { label: "Users",    href: "/docs/users"    },
  { label: "Posts",    href: "/docs/posts"    },
  { label: "Carts",    href: "/docs/carts"    },
  { label: "Recipes",  href: "/docs/recipes"  },
];

const PROJECT_LINKS = [
  { label: "Docs",            href: "/docs"            },
  { label: "Custom Response", href: "/custom-response" },
  { label: "GitHub",          href: "https://github.com/mrvornex/FakeForge", external: true },
];

export default function Footer() {
  return (
    <footer style={{ background: colors.black }}>
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold"
                style={{ background: colors.primary, color: colors.white }}
              >
                DD
              </div>
              <span className="text-[22px] font-semibold" style={{ color: colors.white }}>
                Dum<span style={{ color: colors.primary }}>Data</span>
              </span>
            </Link>
            <p
              className="text-[16px] leading-relaxed max-w-[320px]"
              style={{ color: `${colors.white}99` }}
            >
              Free fake REST API for dummy JSON data. Just fetch and build.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-[14px] font-mono uppercase tracking-widest mb-5"
              style={{ color: colors.primary }}
            >
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[16px] transition-colors hover:!text-[#249D8F]"
                    style={{ color: `${colors.white}B3` }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <h4
              className="text-[14px] font-mono uppercase tracking-widest mb-5"
              style={{ color: colors.primary }}
            >
              Project
            </h4>
            <ul className="flex flex-col gap-3">
              {PROJECT_LINKS.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] transition-colors hover:!text-[#249D8F]"
                      style={{ color: `${colors.white}B3` }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-[16px] transition-colors hover:!text-[#249D8F]"
                      style={{ color: `${colors.white}B3` }}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px]"
          style={{ borderTop: `1px solid ${colors.white}1A`, color: `${colors.white}80` }}
        >
          <span>© {new Date().getFullYear()} DumData. All rights reserved.</span>
          <span className="font-mono">Free · No auth · No rate limits</span>
        </div>

      </div>
    </footer>
  );
}