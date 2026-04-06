"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail } from "lucide-react";

const SKILLS = {
  "Product Management": [
    "Product Strategy",
    "PRD Writing",
    "Roadmapping",
    "A/B Testing",
    "RICE Prioritization",
    "Funnel Analysis",
    "North Star Metrics",
    "GTM Planning",
    "User Research",
  ],
  "Program Management": [
    "Stakeholder Management",
    "Sprint Planning",
    "Cross-functional Execution",
    "Data-driven Decisions",
  ],
  "Analytics & Tools": [
    "SQL",
    "Python",
    "Excel",
    "PowerBI",
    "Apps Script",
    "Pandas",
    "Matplotlib",
  ],
  Technical: [
    "Python-Django",
    "RESTful APIs",
    "MySQL",
    "Database Modelling",
    "System Design",
  ],
};

const TIMELINE = [
  {
    period: "07/2025 – 12/2025",
    role: "Program Manager",
    org: "Licious",
    highlight: "+12% order frequency · ₹GMV impact",
  },
  {
    period: "05/2024 – 06/2024",
    role: "Backend Developer",
    org: "NrityaTech Solutions",
    highlight: "30% query speedup · 99.5% uptime",
  },
  {
    period: "2022 – 2026",
    role: "B.E. Mechanical + Finance Minor",
    org: "BITS Pilani, Hyderabad",
    highlight: "CGPA: 7.3 · NextLeap PM Fellow",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium mb-3">
            <span className="w-4 h-px bg-border" />
            ABOUT
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Why I think differently
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: bio + timeline */}
          <div>
            <div className="text-muted-foreground space-y-4 text-base leading-relaxed mb-10">
              <p>
                I came to product from mechanical engineering and backend
                development. That cross-disciplinary background means I
                understand how systems actually work — not just at the interface
                level, but at the data layer, the API layer, and the ops layer.
              </p>
              <p>
                At Licious, I wasn&apos;t given a neat backlog. I owned a
                city-level P&L review across 7 cities, had to figure out why
                two of them were underperforming, build the tracking
                infrastructure to even answer that question, and then drive
                alignment across supply chain, ops, and data teams to act on
                it.
              </p>
              <p>
                That&apos;s the kind of ambiguity I want to work in. Give me a
                messy problem with real stakes.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="text-xs text-muted-foreground/60 mb-0.5">
                      {item.period}
                    </div>
                    <div className="text-sm font-medium text-white">
                      {item.role}{" "}
                      <span className="text-muted-foreground font-normal">
                        @ {item.org}
                      </span>
                    </div>
                    <div className="text-xs text-blue-400/80 mt-0.5">
                      {item.highlight}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: skills */}
          <div>
            <div className="space-y-6">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest mb-3">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 p-5 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-4">
                Open to APM and PM roles. Always down for a product conversation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="glow" size="sm" className="gap-2" asChild>
                  <a href="mailto:swapnilpahari05@gmail.com">
                    <Mail size={13} />
                    Email me
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a
                    href="https://www.linkedin.com/in/swapnil-pahari/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
