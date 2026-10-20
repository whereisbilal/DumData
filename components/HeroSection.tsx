"use client";

import Link from "next/link";
import { colors } from "@/constants/colors";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.79 8.2 11.38.6.1.82-.25.82-.57 0-.28-.01-1.22-.01-2.22-3.02.55-3.79-.74-4.03-1.41-.14-.35-.72-1.41-1.23-1.69-.42-.23-1.02-.78-.02-.8.95-.01 1.62.87 1.85 1.23 1.08 1.81 2.8 1.3 3.49.99.11-.78.42-1.3.77-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.39 1.23-3.23-.12-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.22a11.4 11.4 0 016 0c2.29-1.54 3.29-1.22 3.29-1.22.66 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.6-2.8 5.62-5.48 5.92.43.38.81 1.09.81 2.21 0 1.6-.02 2.89-.02 3.29 0 .32.22.69.82.58A12.02 12.02 0 0024 12C24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

const STATS = [
  { n: "10+", l: "Resources" },
  { n: "100%", l: "Free Forever" },
  { n: "0ms", l: "Setup Time" },
  { n: "50k+", l: "Developers" },
];

// Code card ke andar white/black ki transparency
const onDark = {
  line: `${colors.white}1A`, // white 10%
  muted: `${colors.white}80`, // white 50%
  soft: `${colors.white}B3`, // white 70%
};

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: colors.background, borderColor: colors.border }}
    >
      {/* Dotted background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${colors.borderStrong} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 pt-16 pb-14 lg:pt-24 lg:pb-20">

        {/* Two column hero */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-12 items-center">

          {/* LEFT: text */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 mb-8"
              style={{ borderColor: colors.border, background: colors.surface }}
            >
              <span className="relative flex w-2 h-2">
                <span
                  className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping"
                  style={{ background: colors.primary }}
                />
                <span
                  className="relative inline-flex w-2 h-2 rounded-full"
                  style={{ background: colors.primary }}
                />
              </span>
              <span className="text-[15px] font-medium" style={{ color: colors.black }}>
                Free · No auth · No rate limits
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-[46px] sm:text-[58px] lg:text-[55px] font-semibold leading-[1.05] tracking-[-2px] mb-6"
              style={{ color: colors.black }}
            >
              Free Fake REST API for<br />
              <span style={{ color: colors.primary }}>Instant JSON Data.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-[18px] sm:text-[19px] leading-[1.7] max-w-[520px] mx-auto lg:mx-0 mb-10"
              style={{ color: colors.textMuted }}
            >
              Instant fake REST APIs for products, users, posts & more.
              No setup, no backend — just fetch and build.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                href="/docs"
                className="text-[16px] font-medium px-7 py-3.5 rounded-[10px] transition-colors"
                style={{ background: colors.primary, color: colors.white }}
                onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
              >
                Explore Docs →
              </Link>
              <a
                href="https://github.com/whereisbilal/DumData"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[16px] font-medium px-7 py-3.5 rounded-[10px] border transition-colors"
                style={{ borderColor: colors.borderStrong, color: colors.black, background: colors.background }}
                onMouseEnter={(e) => (e.currentTarget.style.background = colors.surfaceDark)}
                onMouseLeave={(e) => (e.currentTarget.style.background = colors.background)}
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>

          {/* RIGHT: API preview card */}
          <div className="relative">
            {/* Teal offset shadow */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl"
              style={{ background: colors.primaryLight, border: `1px solid ${colors.border}` }}
            />

            <div
              className="relative rounded-2xl overflow-hidden text-left"
              style={{ background: colors.black }}
            >
              {/* Window bar */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: onDark.line }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="font-mono text-[13px] font-semibold px-2.5 py-1 rounded-md flex-shrink-0"
                    style={{ background: colors.primary, color: colors.white }}
                  >
                    GET
                  </span>
                  <span
                    className="font-mono text-[13px] sm:text-[14px] truncate"
                    style={{ color: onDark.soft }}
                  >
                    dumdata.vercel.app/api/products?limit=3
                  </span>
                </div>
                <span
                  className="hidden sm:flex items-center gap-2 text-[14px] font-medium flex-shrink-0 ml-3"
                  style={{ color: colors.primary }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                  200 OK
                </span>
              </div>

              {/* Label */}
              <div className="px-5 pt-4">
                <span
                  className="text-[12px] font-mono uppercase tracking-widest"
                  style={{ color: onDark.muted }}
                >
                  Response · JSON
                </span>
              </div>

              {/* JSON body */}
              <div
                className="px-5 py-4 font-mono text-[13px] sm:text-[14px] leading-[2] overflow-x-auto"
                style={{ color: colors.white }}
              >
                <div style={{ color: onDark.muted }}>{"{"}</div>
                <div className="pl-5">
                  <span style={{ color: colors.primary }}>"products"</span>: [
                </div>
                <div className="pl-10 whitespace-nowrap">
                  {"{ "}<span style={{ color: colors.primary }}>"id"</span>: <span style={{ color: onDark.soft }}>1</span>{", "}
                  <span style={{ color: colors.primary }}>"title"</span>: "Apple Premium Watch"{", "}
                  <span style={{ color: colors.primary }}>"price"</span>: <span style={{ color: onDark.soft }}>549</span>{" },"}
                </div>
                <div className="pl-10 whitespace-nowrap">
                  {"{ "}<span style={{ color: colors.primary }}>"id"</span>: <span style={{ color: onDark.soft }}>2</span>{", "}
                  <span style={{ color: colors.primary }}>"title"</span>: "Samsung Smart Phone"{", "}
                  <span style={{ color: colors.primary }}>"price"</span>: <span style={{ color: onDark.soft }}>899</span>{" }"}
                </div>
                <div className="pl-5">],</div>
                <div className="pl-5">
                  <span style={{ color: colors.primary }}>"total"</span>: <span style={{ color: onDark.soft }}>194</span>,{" "}
                  <span style={{ color: colors.primary }}>"limit"</span>: <span style={{ color: onDark.soft }}>3</span>
                </div>
                <div style={{ color: onDark.muted }}>{"}"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats: 4 alag boxes */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 lg:mt-24 rounded-2xl overflow-hidden border"
          style={{ background: colors.border, borderColor: colors.border }}
        >
          {STATS.map((s) => (
            <div
              key={s.l}
              className="px-6 py-8 text-center"
              style={{ background: colors.background }}
            >
              <div
                className="text-[34px] sm:text-[40px] font-semibold tracking-tight"
                style={{ color: colors.primary }}
              >
                {s.n}
              </div>
              <div className="text-[15px] mt-1 font-medium" style={{ color: colors.textMuted }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}