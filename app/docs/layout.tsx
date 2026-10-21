// app/docs/layout.tsx
import type { ReactNode } from "react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { colors } from "@/constants/colors";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: colors.background }}>
      {/* Mobile: patti upar, content neeche. Desktop: sidebar left, content right */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <DocsSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}