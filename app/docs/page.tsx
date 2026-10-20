// app/docs/page.tsx — Introduction page
import Link from "next/link";
import {
  CodeBlock,
  DocsPageHeader,
  OnThisPage,
  SectionTitle,
} from "@/components/docs/DocsComponents";
import { colors } from "@/constants/colors";

const RESOURCES = [
  { name: "Products", href: "/docs/products", count: "194", desc: "Full CRUD + search + categories" },
  { name: "Users",    href: "/docs/users",    count: "208", desc: "Auth, filter, sub-resources"     },
  { name: "Posts",    href: "/docs/posts",    count: "251", desc: "With comments, search, sort"     },
  { name: "Comments", href: "/docs/comments", count: "340", desc: "Linked to posts and users"       },
  { name: "Todos",    href: "/docs/todos",    count: "254", desc: "Random, by user, CRUD"           },
  { name: "Carts",    href: "/docs/carts",    count: "20",  desc: "With products and totals"        },
  { name: "Quotes",   href: "/docs/quotes",   count: "100", desc: "Random + search"                 },
  { name: "Recipes",  href: "/docs/recipes",  count: "50",  desc: "By tag, meal type, search"       },
];

const PARAMS = [
  ["limit",  "number", "Max items to return (default: 30, max: 100)"],
  ["skip",   "number", "Items to skip, use with limit for pagination"],
  ["select", "string", "Comma-separated fields: id,title,price"],
  ["sortBy", "string", "Field name to sort by"],
  ["order",  "string", "Sort direction: asc or desc"],
  ["q",      "string", "Full-text search query"],
  ["delay",  "number", "Simulate network latency in milliseconds (max 5000)"],
];

const CODE_QUICK = `// Any endpoint, no setup needed
const res = await fetch('https://dumdata.vercel.app/api/products?limit=5');
const { products } = await res.json();`;

const CODE_PARAMS = `// Common query params work on all list endpoints
fetch('/api/products?limit=10&skip=20')         // pagination
fetch('/api/products?sortBy=price&order=desc')  // sorting
fetch('/api/products?select=id,title,price')    // field selection
fetch('/api/products?q=phone')                  // search
fetch('/api/products?delay=2000')               // latency simulation`;

export default function DocsIndexPage() {
  return (
    <div className="flex">
      <div className="flex-1 min-w-0 px-8 py-10 max-w-[860px]">

        <DocsPageHeader
          title="Introduction"
          breadcrumb="Introduction"
          description="DumData is a free fake REST API for developers. No registration, no API key, no rate limits. Just fetch and build."
        />

        {/* Quick Start */}
        <section id="quick-start" className="scroll-mt-[140px]">
          <SectionTitle title="Quick Start" />
          <CodeBlock code={CODE_QUICK} />
        </section>

        {/* Base URL */}
        <section id="base-url" className="scroll-mt-[140px]">
          <SectionTitle title="Base URL" />
          <div
            className="rounded-xl p-5 flex items-center gap-4"
            style={{ background: colors.primaryLight, border: `1px solid ${colors.border}` }}
          >
            <span className="font-mono text-[13px] tracking-widest" style={{ color: colors.textMuted }}>
              BASE URL
            </span>
            <div className="w-px h-5" style={{ background: colors.borderStrong }} />
            <span className="font-mono text-[16px] font-semibold break-all" style={{ color: colors.primary }}>
              https://dumdata.vercel.app
            </span>
          </div>
        </section>

        {/* Common Params */}
        <section id="common-params" className="scroll-mt-[140px]">
          <SectionTitle title="Common Params" />

          <div className="overflow-x-auto mb-2">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Param", "Type", "Description"].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-[12px] text-left px-2 pb-2 tracking-wider uppercase font-normal"
                      style={{ color: colors.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PARAMS.map(([param, type, desc]) => (
                  <tr key={param} style={{ borderTop: `1px solid ${colors.border}` }}>
                    <td className="font-mono text-[14px] px-2 py-2.5" style={{ color: colors.primary }}>
                      {param}
                    </td>
                    <td className="font-mono text-[14px] px-2 py-2.5" style={{ color: colors.textMuted }}>
                      {type}
                    </td>
                    <td className="text-[15px] px-2 py-2.5" style={{ color: colors.black }}>
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock code={CODE_PARAMS} />
        </section>

        {/* All Resources */}
        <section id="all-resources" className="scroll-mt-[140px]">
          <SectionTitle title="All Resources" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RESOURCES.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                className="rounded-xl border-2 p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: colors.white, borderColor: colors.border }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors.primary }} />
                  <span className="text-[18px] font-bold" style={{ color: colors.black }}>
                    {r.name}
                  </span>
                  <span className="font-mono text-[13px] ml-auto" style={{ color: colors.primary }}>
                    {r.count}
                  </span>
                </div>
                <p className="text-[15px]" style={{ color: colors.textMuted }}>
                  {r.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <OnThisPage items={["Quick Start", "Base URL", "Common Params", "All Resources"]} />
    </div>
  );
}