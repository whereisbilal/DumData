import type { CSSProperties } from "react";
import { colors } from "@/constants/colors";

interface Resource {
  title: string;
  url: string;
  href: string;
  icon: string;
}

const RESOURCES: Resource[] = [
  { title: "Products", url: "fakeforge.vercel.app/api/products",   href: "/api/products",      icon: "ti-headphones"    },
  { title: "Carts",    url: "fakeforge.vercel.app/api/carts",      href: "/api/carts",         icon: "ti-shopping-cart" },
  { title: "Users",    url: "fakeforge.vercel.app/api/users",      href: "/api/users",         icon: "ti-user"          },
  { title: "Posts",    url: "fakeforge.vercel.app/api/posts",      href: "/api/posts",         icon: "ti-pencil"        },
  { title: "Comments", url: "fakeforge.vercel.app/api/comments",   href: "/api/comments",      icon: "ti-message"       },
  { title: "Quotes",   url: "fakeforge.vercel.app/api/quotes",     href: "/api/quotes",        icon: "ti-quote"         },
  { title: "Todos",    url: "fakeforge.vercel.app/api/todos",      href: "/api/todos",         icon: "ti-list-check"    },
  { title: "Recipes",  url: "fakeforge.vercel.app/api/recipes",    href: "/api/recipes",       icon: "ti-flame"         },
  { title: "Image",    url: "fakeforge.vercel.app/api/image",      href: "/api/image/400x300", icon: "ti-photo"         },
  { title: "Auth",     url: "fakeforge.vercel.app/api/auth/login", href: "/api/auth/login",    icon: "ti-lock"          },
];

// colors.ts ke values se CSS variables
const themeVars = {
  "--primary":       colors.primary,
  "--primary-hover": colors.primaryHover,
  "--primary-light": colors.primaryLight,
  "--border":        colors.border,
  "--white":         colors.white,
  "--white-20":      `${colors.white}33`, // white 20%
  "--white-70":      `${colors.white}B3`, // white 70%
  "--black":         colors.black,
  "--black-50":      `${colors.black}80`, // black 50%
} as CSSProperties;

export default function ResourceCards() {
  return (
    <section
      style={themeVars}
      className="px-8 py-16 bg-[var(--white)]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-[color:var(--black)] mb-2">
            Top <span className="text-[color:var(--primary)]">Resources:</span>
          </h2>
          <p className="text-[17px] sm:text-[18px] text-[color:var(--black-50)]">
            Access fake data, fully organized and ready to use, all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={`https://fakeforge.vercel.app${r.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 px-6 py-6 rounded-[16px] border border-[color:var(--border)] bg-[var(--white)] hover:bg-[var(--primary)] hover:border-[color:var(--primary)] hover:-translate-y-0.5 transition-all duration-150"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-[12px] bg-[var(--primary-light)] group-hover:bg-[var(--white-20)] flex items-center justify-center flex-shrink-0 transition-colors">
                <i
                  className={`ti ${r.icon} text-[color:var(--primary)] group-hover:text-[color:var(--white)] transition-colors`}
                  style={{ fontSize: 32 }}
                  aria-hidden="true"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[22px] font-bold text-[color:var(--black)] group-hover:text-[color:var(--white)] mb-1 transition-colors">
                  {r.title}
                </div>
                <div className="text-[14px] font-mono truncate text-[color:var(--black-50)] group-hover:text-[color:var(--white-70)] transition-colors">
                  {r.url}
                </div>
              </div>

              {/* Arrow */}
              <i
                className="ti ti-arrow-up-right text-[color:var(--primary)] group-hover:text-[color:var(--white)] transition-colors"
                style={{ fontSize: 24 }}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}