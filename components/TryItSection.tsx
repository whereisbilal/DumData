"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { colors } from "@/constants/colors";

const RESOURCES = [
  "products",
  "carts",
  "users",
  "posts",
  "comments",
  "quotes",
  "recipes",
  "todos",
];

const SITE_URL = "https://dumdata.vercel.app";
const EMPTY_JSON = `{\n  "hint": "Select a resource from the dropdown"\n}`;

type Status = "idle" | "loading" | "success" | "error";

export default function TryItSection() {
  const [resource, setResource] = useState("");
  const [json, setJson] = useState(EMPTY_JSON);
  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    // Jab tak resource select na ho, kuch fetch nahi hoga
    if (!resource) {
      setStatus("idle");
      setJson(EMPTY_JSON);
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setStatusText("");
    setJson("Loading...");

    fetch(`/api/${resource}?limit=1`)
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;

        setJson(JSON.stringify(data, null, 2));
        setStatusText(`${res.status} ${res.ok ? "OK" : "Error"}`);
        setStatus(res.ok ? "success" : "error");
      })
      .catch(() => {
        if (cancelled) return;

        setJson("Something went wrong. Please try again.");
        setStatusText("Failed");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [resource]);

  return (
    <section className="px-8 py-20" style={{ background: colors.background }}>
      <div className="max-w-3xl mx-auto text-center">

        {/* Heading */}
        <h2
          className="text-[36px] sm:text-[48px] font-bold leading-tight mb-3"
          style={{ color: colors.black }}
        >
          Try it <span style={{ color: colors.primary }}>yourself!</span>
        </h2>
        <p className="text-[18px] mb-10" style={{ color: colors.textMuted }}>
          Pick a resource from the dropdown and see the live response.
        </p>
{/* URL bar */}
<div
  className="flex flex-wrap items-center justify-center gap-2 w-fit max-w-full mx-auto rounded-2xl sm:rounded-full border-2 px-4 sm:px-6 py-3 mb-6 font-mono text-[13px] sm:text-[17px]"
  style={{ borderColor: colors.borderStrong, background: colors.surfaceDark, color: colors.black }}
>
  <span className="break-all">fetch(&apos;{SITE_URL}/api/</span>

  <select
    value={resource}
    onChange={(e) => setResource(e.target.value)}
    className="rounded-full px-4 py-1.5 font-mono text-[13px] sm:text-[17px] font-semibold cursor-pointer outline-none"
    style={{ background: colors.primary, color: colors.white }}
  >
    <option value="" disabled style={{ background: colors.white, color: colors.black }}>
      RESOURCE
    </option>
    {RESOURCES.map((r) => (
      <option key={r} value={r} style={{ background: colors.white, color: colors.black }}>
        {r}
      </option>
    ))}
  </select>

  <span>&apos;)</span>
</div>

        {/* Code card */}
        <div
          className="rounded-2xl overflow-hidden text-left border-2"
          style={{ background: colors.black, borderColor: colors.black }}
        >
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-5 py-3 font-mono text-[14px]"
            style={{ borderBottom: `1px solid ${colors.white}1A`, color: `${colors.white}B3` }}
          >
            <span>
              <span style={{ color: colors.primary }} className="font-semibold">GET</span>{" "}
              /api/{resource || "..."}
            </span>

            {status === "loading" && (
              <span style={{ color: `${colors.white}80` }}>● Loading...</span>
            )}
            {status === "success" && (
              <span style={{ color: colors.primary }}>● {statusText}</span>
            )}
            {status === "error" && (
              <span style={{ color: colors.white }}>● {statusText}</span>
            )}
          </div>

          {/* JSON */}
          <pre
            className="px-5 py-4 h-[360px] overflow-auto font-mono text-[14px] leading-[1.8]"
            style={{ color: status === "idle" || status === "loading" ? `${colors.white}80` : colors.white }}
          >
            {json}
          </pre>
        </div>

        {/* Button */}
        <Link
          href="/docs"
          className="inline-block mt-10 text-[16px] font-medium px-8 py-3.5 rounded-[10px] transition-colors"
          style={{ background: colors.primary, color: colors.white }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
        >
          View Docs →
        </Link>

      </div>
    </section>
  );
}