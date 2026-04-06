"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react";

const STATS = [
  { value: "₹30Cr", label: "ARR unlocked" },
  { value: "+12%", label: "Order frequency" },
  { value: "~40%", label: "Decision lag cut" },
  { value: "3", label: "Core PM projects" },
];

const ROLES = ["Product Manager", "Systems Thinker", "Builder", "Problem Solver"];

export function HeroSection({ onTalkToAI }: { onTalkToAI: () => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/4 blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-24">
        {/* Status badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <Badge variant="blue" className="gap-1.5 px-3 py-1 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />
            Open to APM roles · Graduating May 2026
          </Badge>
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight mb-4 animate-slide-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          <span className="text-white">Swapnil</span>{" "}
          <span className="gradient-text">Pahari</span>
        </h1>

        {/* Typewriter role */}
        <div
          className="text-xl md:text-2xl text-muted-foreground mb-6 h-8 animate-fade-in"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <span className="text-blue-400 font-medium">{displayed}</span>
          <span className="animate-blink text-blue-400">|</span>
        </div>

        {/* Hero headline */}
        <h2
          className="text-2xl md:text-4xl font-medium text-white/90 mb-4 leading-tight animate-slide-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          I solve product problems,
          <br />
          <span className="text-white/50">not just build features.</span>
        </h2>

        <p
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.55s", opacity: 0 }}
        >
          BITS Pilani '26 · Ex-Licious PM · Building at the intersection of
          product strategy, data, and systems thinking.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-slide-up"
          style={{ animationDelay: "0.65s", opacity: 0 }}
        >
          <Button
            size="xl"
            variant="glow"
            onClick={onTalkToAI}
            className="gap-2 font-medium"
          >
            <Sparkles size={18} />
            Talk to my AI
          </Button>
          <Button size="xl" variant="outline" className="gap-2">
            <a
              href="https://www.linkedin.com/in/swapnil-pahari/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </Button>
          <Button size="xl" variant="outline" className="gap-2">
            <a
              href="https://github.com/SWAPNIL72902"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4"
            >
              <div className="text-2xl font-semibold text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ArrowDown size={18} />
      </div>
    </section>
  );
}
