"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Param {
  name: string; type: string; required: boolean; description: string;
}

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string; description: string;
  params?: Param[]; code: string;
}

const BASE = "dumdata.vercel.app/api";

// ─── Method badge colors (sirf teal / white / black) ──────────────────────────
const METHOD_STYLE: Record<string, { background: string; color: string; border: string }> = {
  GET:    { background: colors.primary,      color: colors.white,   border: colors.primary },
  POST:   { background: colors.black,        color: colors.white,   border: colors.black   },
  PUT:    { background: colors.primaryLight, color: colors.primary, border: colors.primary },
  PATCH:  { background: colors.primaryLight, color: colors.primary, border: colors.primary },
  DELETE: { background: colors.white,        color: colors.black,   border: colors.black   },
};

// ─── Code highlight (ek hi baar mein sab check hota hai) ──────────────────────
function highlight(code: string) {
  const safe = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return safe.replace(
    /(\/\/.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(const|let|var|await|async|function|return|if|else|try|catch|new)\b|\b(\d+)\b/gm,
    (match, comment, str, keyword, num) => {
      if (comment) return `<span style="color:${colors.white}66">${match}</span>`;
      if (str)     return `<span style="color:${colors.primary}">${match}</span>`;
      if (keyword) return `<span style="font-weight:600">${match}</span>`;
      if (num)     return `<span style="color:${colors.primary}">${match}</span>`;
      return match;
    }
  );
}

// ─── Code Block ───────────────────────────────────────────────────────────────
export function CodeBlock({ code, lang = "javascript" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden mt-5 max-w-full" style={{ background: colors.black }}>
      <div
        className="flex items-center px-4 py-2.5"
        style={{ borderBottom: `1px solid ${colors.white}1A` }}
      >
        <span
          className="font-mono text-[12px] tracking-widest uppercase"
          style={{ color: `${colors.white}80` }}
        >
          {lang}
        </span>
        <button
          onClick={copy}
          className="ml-auto font-mono text-[12px] rounded-md px-3 py-1 transition-opacity hover:opacity-80"
          style={{ background: colors.primary, color: colors.white }}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>

      <pre
        className="px-4 sm:px-5 py-4 font-mono text-[13px] sm:text-[14px] leading-[1.8] overflow-x-auto"
        style={{ color: colors.white }}
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  );
}

// ─── Params Table ─────────────────────────────────────────────────────────────
const requiredStyle = (required: boolean) =>
  required
    ? { background: colors.primary, color: colors.white }
    : { background: colors.primaryLight, color: colors.textMuted };

export function ParamsTable({ params, title = "Parameters" }: { params: Param[]; title?: string }) {
  return (
    <div className="mt-5">
      <p
        className="font-mono text-[12px] tracking-widest uppercase mb-3"
        style={{ color: colors.primary }}
      >
        {title}
      </p>

      {/* Mobile: har parameter ek alag block mein */}
      <div className="sm:hidden flex flex-col">
        {params.map((p) => (
          <div
            key={p.name}
            className="py-3"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-[14px] font-semibold" style={{ color: colors.primary }}>
                {p.name}
              </span>
              <span className="font-mono text-[13px]" style={{ color: colors.textMuted }}>
                {p.type}
              </span>
              <span
                className="font-mono text-[12px] px-2 py-0.5 rounded"
                style={requiredStyle(p.required)}
              >
                {p.required ? "required" : "optional"}
              </span>
            </div>
            <p className="text-[15px]" style={{ color: colors.black }}>
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tablet / desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Parameter", "Type", "Required", "Description"].map((h) => (
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
            {params.map((p) => (
              <tr key={p.name} style={{ borderTop: `1px solid ${colors.border}` }}>
                <td className="font-mono text-[14px] px-2 py-2.5" style={{ color: colors.primary }}>
                  {p.name}
                </td>
                <td className="font-mono text-[14px] px-2 py-2.5" style={{ color: colors.textMuted }}>
                  {p.type}
                </td>
                <td className="px-2 py-2.5">
                  <span
                    className="font-mono text-[12px] px-2 py-0.5 rounded"
                    style={requiredStyle(p.required)}
                  >
                    {p.required ? "required" : "optional"}
                  </span>
                </td>
                <td className="text-[15px] px-2 py-2.5" style={{ color: colors.black }}>
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Endpoint Card ────────────────────────────────────────────────────────────
export function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);
  const badge = METHOD_STYLE[endpoint.method];

  return (
    <div
      className="rounded-xl overflow-hidden mb-4 border-2 transition-colors duration-150"
      style={{
        background: colors.white,
        borderColor: open ? colors.primary : colors.border,
      }}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 sm:px-5 py-4 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="font-mono text-[12px] sm:text-[13px] font-semibold px-3 py-1 rounded-md border min-w-[64px] text-center"
          style={badge}
        >
          {endpoint.method}
        </span>

        <span className="font-mono text-[13px] sm:text-[15px] flex-1 min-w-0 break-all">
          <span className="hidden sm:inline" style={{ color: colors.textMuted }}>{BASE}</span>
          <span style={{ color: colors.black }}>{endpoint.path}</span>
        </span>

        <span className="text-[15px] hidden lg:inline" style={{ color: colors.textMuted }}>
          {endpoint.description}
        </span>

        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: colors.primary }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Body */}
      {open && (
        <div className="px-4 sm:px-5 pb-5" style={{ borderTop: `1px solid ${colors.border}` }}>
          {/* Description yahan dikhti hai jab header mein jagah na ho */}
          <p className="lg:hidden text-[15px] mt-4" style={{ color: colors.textMuted }}>
            {endpoint.description}
          </p>

          {endpoint.params && endpoint.params.length > 0 && (
            <ParamsTable
              params={endpoint.params}
              title={endpoint.method === "GET" ? "Query Parameters" : "Path Parameters"}
            />
          )}
          <CodeBlock code={endpoint.code} />
        </div>
      )}
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-5 mt-8 sm:mt-10">
      <span
        className="text-[14px] sm:text-[15px] font-bold tracking-widest uppercase"
        style={{ color: colors.black }}
      >
        {title}
      </span>
      <div className="flex-1 h-px" style={{ background: colors.border }} />
    </div>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────
export function DocsPageHeader({
  title, description, breadcrumb,
}: {
  title: string; description: string; breadcrumb: string;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <div
        className="flex items-center gap-2 font-mono text-[13px] mb-4 sm:mb-5"
        style={{ color: colors.textMuted }}
      >
        <span>Docs</span>
        <span>/</span>
        <span style={{ color: colors.primary }}>{breadcrumb}</span>
      </div>

      <h1
        className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-tight mb-3"
        style={{ color: colors.black }}
      >
        {title}
      </h1>
      <p
        className="text-[16px] sm:text-[18px] leading-relaxed max-w-[640px]"
        style={{ color: colors.textMuted }}
      >
        {description}
      </p>
    </div>
  );
}

// ─── On This Page (right sidebar, sirf badi screen par) ───────────────────────
export function OnThisPage({ items }: { items: string[] }) {
  return (
    <aside
      className="w-[200px] flex-shrink-0 px-4 py-5 sticky top-[122px] h-[calc(100vh-122px)] overflow-y-auto hidden xl:block"
      style={{ borderLeft: `1px solid ${colors.border}` }}
    >
      <p
        className="font-mono text-[12px] tracking-widest uppercase mb-3"
        style={{ color: colors.textMuted }}
      >
        On this page
      </p>

      {items.map((item, i) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
          className="block font-mono text-[14px] py-1.5 pl-3 hover:opacity-70 transition-opacity"
          style={{
            color: i === 0 ? colors.primary : colors.textMuted,
            borderLeft: `2px solid ${i === 0 ? colors.primary : "transparent"}`,
          }}
        >
          {item}
        </a>
      ))}
    </aside>
  );
}