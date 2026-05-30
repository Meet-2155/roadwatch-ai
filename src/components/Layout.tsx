import { Navbar } from "./Navbar";
import { Chatbot } from "./Chatbot";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/40 mt-16 py-6 text-center text-sm text-muted-foreground">
        © 2026 RoadWatch AI · Building transparent, AI-monitored road infrastructure
      </footer>
      <Chatbot />
    </div>
  );
}
