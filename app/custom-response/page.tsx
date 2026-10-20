"use client";

import { useState } from "react";
import { colors } from "@/constants/colors";

const API_PATH = "/api/custom";

const SAMPLE_JSON = `{
  "name": "Ali",
  "age": 22,
  "city": "Karachi"
}`;

type Status = "idle" | "loading" | "success" | "error";

export default function CustomResponseSection() {
  const [body, setBody] = useState(SAMPLE_JSON);
  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    // 1. Pehle check karein ke JSON sahi hai ya nahi
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      setStatus("error");
      setStatusText("Invalid JSON");
      setUrl("");
      return;
    }

    // 2. API ko bhejein
    setStatus("loading");
    setStatusText("");
    setUrl("");
    setCopied(false);

    try {
      const res = await fetch(API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });

      // Pehle text lein, phir JSON mein badalne ki koshish karein
      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("API ne JSON nahi diya:", text);
      }

      if (!res.ok || !data) {
        setStatus("error");
        setStatusText(`${res.status} ${data?.message ?? res.statusText ?? "Error"}`);
        console.error("Status:", res.status, "Response:", text);
        return;
      }

      setUrl(data.url);
      setStatus("success");
      setStatusText(`${res.status} Created`);
    } catch (err) {
      console.error("Request fail hui:", err);
      setStatus("error");
      setStatusText("Network Error");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="px-8 py-20" style={{ background: colors.background }}>
      <div className="max-w-3xl mx-auto text-center">

        {/* Heading */}
        <h2
          className="text-[36px] sm:text-[48px] font-bold leading-tight mb-3"
          style={{ color: colors.black }}
        >
          Custom <span style={{ color: colors.primary }}>Response</span>
        </h2>
        <p className="text-[18px] mb-10" style={{ color: colors.textMuted }}>
          Need a REST API for custom JSON data? Enter a response body below and
          click &quot;Generate Now&quot; to get your custom API URL.
        </p>

        {/* Code card (JSON input) */}
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
              <span style={{ color: colors.primary }} className="font-semibold">POST</span>{" "}
              {API_PATH}
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

          {/* JSON textarea */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            spellCheck={false}
            placeholder='{ "key": "value" }'
            className="w-full px-5 py-4 h-[320px] font-mono text-[14px] leading-[1.8] resize-none outline-none bg-transparent"
            style={{ color: colors.white }}
          />
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={status === "loading"}
          className="mt-8 text-[16px] font-medium px-8 py-3.5 rounded-[10px] transition-colors disabled:opacity-60"
          style={{ background: colors.primary, color: colors.white }}
          onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
        >
          {status === "loading" ? "Generating..." : "Generate Now →"}
        </button>

        {/* Result URL bar */}
        {url && (
          <div
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border-2 pl-6 pr-2 py-2 font-mono text-[15px] sm:text-[17px]"
            style={{ borderColor: colors.borderStrong, background: colors.surfaceDark, color: colors.black }}
          >
            <span className="break-all">{url}</span>
            <button
              onClick={handleCopy}
              className="rounded-full px-4 py-1.5 font-semibold cursor-pointer"
              style={{ background: colors.primary, color: colors.white }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}