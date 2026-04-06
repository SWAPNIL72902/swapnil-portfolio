"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

export function NavBar({ onTalkToAI }: { onTalkToAI: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium text-white/90 hover:text-white transition-colors"
        >
          Swapnil Pahari
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            onClick={onTalkToAI}
            className="gap-1.5 text-xs"
          >
            <Sparkles size={12} />
            Talk to AI
          </Button>
        </div>
      </div>
    </nav>
  );
}
