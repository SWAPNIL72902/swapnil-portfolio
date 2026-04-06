"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  impact: string;
  aiPrompt: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "paytm",
    title: "Paytm UPI Failure Recovery",
    subtitle: "Product Strategy & Roadmapping",
    icon: <Zap size={20} />,
    tags: ["FinTech", "PRD", "A/B Testing", "UPI"],
    metrics: [
      { label: "GMV loss stopped", value: "₹2.5Cr/mo" },
      { label: "ARR unlocked", value: "₹30Cr" },
      { label: "Support tickets", value: "-25%" },
    ],
    problem:
      "2–3% UPI failure rate causing silent drops — users had zero visibility, 68% never retried.",
    solution:
      "Async polling + smart retry gating + live refund tracking. Rebuilt the entire failure recovery loop.",
    impact: "+0.5% payment completion → ₹30Cr ARR unlocked",
    aiPrompt: "Walk me through the Paytm UPI failure recovery project in detail",
    color: "blue",
  },
  {
    id: "logistics",
    title: "AI Reverse Logistics Verification",
    subtitle: "Product Strategy & System Design",
    icon: <TrendingUp size={20} />,
    tags: ["AI/ML", "System Design", "Logistics", "NLU"],
    metrics: [
      { label: "Reattempt cost", value: "↓ Reduced" },
      { label: "Fraud detection", value: "NLU-powered" },
      { label: "Refund speed", value: "↑ Faster" },
    ],
    problem:
      "Unverified pickup failures driving high reattempt costs — no real-time loop between agent, customer, and system.",
    solution:
      "3-layer AI system: pre-pickup conversational AI, live bridge calls on failure, NLU intent classification for fraud detection.",
    impact: "Lower fraud rate, reduced costs, faster refunds",
    aiPrompt:
      "Tell me about the AI Reverse Logistics Verification project — the problem, system design, and trade-offs",
    color: "emerald",
  },
  {
    id: "meesho",
    title: "Meesho Cart Abandonment",
    subtitle: "Product Management & Experimentation",
    icon: <MessageSquare size={20} />,
    tags: ["E-commerce", "RICE", "Experimentation", "Conversion"],
    metrics: [
      { label: "Conversion gap", value: "15%" },
      { label: "Monthly sessions", value: "5M" },
      { label: "Projected uplift", value: "+10%" },
    ],
    problem:
      "15% conversion gap vs benchmark across 5M monthly reseller sessions — root cause buried in user psychology, not UX.",
    solution:
      "Reseller Confidence Bar: real-time margin calculator + return policy indicator. RICE-prioritized with holdout A/B plan.",
    impact: "+10% conversion → 500K additional monthly orders",
    aiPrompt:
      "How did you approach the Meesho cart abandonment problem? Walk me through your thinking",
    color: "violet",
  },
];

const COLOR_MAP = {
  blue: {
    icon: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    badge: "border-blue-500/20 bg-blue-500/8 text-blue-400",
    metric: "text-blue-400",
    glow: "hover:border-blue-500/30 hover:shadow-blue-500/5",
    btn: "border-blue-500/30 text-blue-400 hover:bg-blue-500/10",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    badge: "border-emerald-500/20 bg-emerald-500/8 text-emerald-400",
    metric: "text-emerald-400",
    glow: "hover:border-emerald-500/30 hover:shadow-emerald-500/5",
    btn: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    badge: "border-violet-500/20 bg-violet-500/8 text-violet-400",
    metric: "text-violet-400",
    glow: "hover:border-violet-500/30 hover:shadow-violet-500/5",
    btn: "border-violet-500/30 text-violet-400 hover:bg-violet-500/10",
  },
};

export function ProjectsSection({
  onAskAI,
}: {
  onAskAI: (prompt: string) => void;
}) {
  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium mb-3">
            <span className="w-4 h-px bg-border" />
            SELECTED WORK
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Projects that moved metrics
          </h2>
          <p className="text-muted-foreground max-w-md">
            Each project: a real problem, a structured approach, quantified
            outcomes.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-6">
          {PROJECTS.map((project) => {
            const colors = COLOR_MAP[project.color as keyof typeof COLOR_MAP];
            return (
              <div
                key={project.id}
                className={cn(
                  "rounded-2xl border border-border bg-card p-6 md:p-8",
                  "transition-all duration-300 hover:shadow-lg",
                  colors.glow
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                          colors.icon
                        )}
                      >
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-0.5">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full border border-border bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Problem → Solution → Impact */}
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wide">
                          Problem
                        </span>
                        <p className="text-muted-foreground mt-0.5">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wide">
                          Solution
                        </span>
                        <p className="text-muted-foreground mt-0.5">
                          {project.solution}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wide">
                          Impact
                        </span>
                        <p className={cn("mt-0.5 font-medium", colors.metric)}>
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: metrics + CTA */}
                  <div className="md:w-52 shrink-0 space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-border bg-background/50 px-3 py-2.5"
                        >
                          <div
                            className={cn(
                              "text-base font-semibold",
                              colors.metric
                            )}
                          >
                            {m.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("w-full gap-2 text-xs", colors.btn)}
                      onClick={() => onAskAI(project.aiPrompt)}
                    >
                      <MessageSquare size={12} />
                      Ask AI about this
                      <ArrowRight size={12} className="ml-auto" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
