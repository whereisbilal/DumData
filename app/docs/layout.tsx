// app/docs/layout.tsx
import type { ReactNode } from "react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { colors } from "@/constants/colors";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      <div className="flex max-w-7xl mx-auto">
        <DocsSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}