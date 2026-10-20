"use client";

import { colors } from "@/constants/colors";




const FEATURES = [
  {
    title: "10+ Ready-to-use Resources",
    desc: "Products, users, posts, comments, carts, todos, quotes, recipes & more, all with realistic data.",
  },
  {
    title: "Pagination & Filtering",
    desc: "Limit, skip, sort, search & select specific fields from any resource.",
  },
  {
    title: "JWT Auth System",
    desc: "Login, get access & refresh tokens, and test authenticated endpoints just like a real app.",
  },
  {
    title: "Dynamic Images",
    desc: "Generate placeholder images with custom size, color, text and format on the fly.",
  },
  {
    title: "Delay Simulation",
    desc: "Add artificial latency to any request to test loading states and skeleton UIs.",
  },
  {
    title: "Custom Response",
    desc: "Send your own JSON, get a unique URL back. Perfect for mocking custom API shapes.",
  },
  {
    title: "Mock HTTP Status Codes",
    desc: "Test how your app handles 200, 400, 401, 404, 500 and more, just hit the right route.",
  },
  {
    title: "Zero Setup",
    desc: "No API key, no registration, no rate limits. Works with any frontend stack.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-8 py-20" style={{ background: colors.background }}>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <p
          className="text-center text-[14px] font-mono uppercase tracking-widest mb-4"
          style={{ color: colors.primary }}
        >
          Why DumData
        </p>

        <h2
          className="text-center text-[36px] sm:text-[48px] font-bold leading-tight mb-4"
          style={{ color: colors.black }}
        >
          Everything you need to{" "}
          <span style={{ color: colors.primary }}>prototype fast</span>
        </h2>

        <p
          className="text-center text-[18px] max-w-[560px] mx-auto mb-14"
          style={{ color: colors.textMuted }}
        >
          No backend? No problem. DumData gives you realistic data instantly
          so you can focus on building.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-[16px] border-2 p-6 pt-7 border-t-4 transition-all duration-200 hover:-translate-y-1"
              style={{
                borderColor: colors.border,
                borderTopColor: colors.primary,
                background: colors.white,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.borderTopColor = colors.primary;
              }}
            >
              {/* Number badge */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[14px] font-semibold mb-5"
                style={{ background: colors.primaryLight, color: colors.primary }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3
                className="text-[20px] font-semibold mb-2"
                style={{ color: colors.black }}
              >
                {f.title}
              </h3>
              <p
                className="text-[16px] leading-relaxed"
                style={{ color: colors.textMuted }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}