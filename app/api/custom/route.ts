// app/api/custom/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { CORS_HEADERS } from "@/lib/api";

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;

  return NextResponse.json(
    {
      message: "POST your JSON to get a unique URL.",
      example: {
        method: "POST",
        url: `${origin}/api/custom`,
        body: { name: "Ali", role: "admin" },
      },
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  // 1. Body padhna
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const data = body.data ?? body;

  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { message: "JSON must be an object or array" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const size = JSON.stringify(data).length;
  if (size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { message: "JSON too large. Max 5 MB." },
      { status: 413, headers: CORS_HEADERS }
    );
  }

  // 2. KV mein save karna (7 din ke liye)
  const id = generateId();
  try {
    await kv.set(`custom:${id}`, JSON.stringify(data), { ex: 60 * 60 * 24 * 7 });
  } catch (err) {
    console.error("KV error:", err);
    return NextResponse.json(
      { message: "Storage error. Check Vercel KV setup." },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  // 3. URL usi domain ka jo request mein aaya hai
  const origin = new URL(req.url).origin;

  return NextResponse.json(
    {
      id,
      url: `${origin}/api/custom/${id}`,
      size,
      expiresIn: "7 days",
      createdAt: new Date().toISOString(),
    },
    { status: 201, headers: CORS_HEADERS }
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}