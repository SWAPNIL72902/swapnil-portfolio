"use client";

import { useRef, useCallback } from "react";
import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";

export default function Home() {
  // Holds a reference to ChatInterface's sendMessage function
  const sendMessageRef = useRef<((msg: string) => void) | null>(null);

  const scrollToChat = useCallback(() => {
    const el = document.getElementById("chat");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleAskAI = useCallback(
    (prompt: string) => {
      scrollToChat();
      // Small delay to let scroll animation start before sending
      setTimeout(() => {
        sendMessageRef.current?.(prompt);
      }, 700);
    },
    [scrollToChat]
  );

  return (
    <div className="noise-bg min-h-screen bg-background">
      <NavBar onTalkToAI={scrollToChat} />

      <main>
        <HeroSection onTalkToAI={scrollToChat} />

        <ChatInterface
          id="chat"
          setSendRef={(fn) => { sendMessageRef.current = fn; }}
        />

        <ProjectsSection onAskAI={handleAskAI} />
        <AboutSection />
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 Swapnil Pahari · BITS Pilani</span>
          <span className="text-xs opacity-50">Built with Next.js · Powered by Claude AI</span>
        </div>
      </footer>
    </div>
  );
}
