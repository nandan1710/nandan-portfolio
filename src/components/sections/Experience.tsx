"use client";

import React from "react";
import { experiences } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { Briefcase, Calendar, Terminal, Clock, CheckCircle2 } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono text-indigo-400 font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>04 // TECHNICAL DEVELOPMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Internships &amp; Professional Training
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Real-world industry exposure spanning RTL design verification, embedded firmware development, and software-hardware interface integration.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Circuit Line */}
          <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 -ml-[1px] w-[2px] bg-gradient-to-b from-brand-cyan via-indigo-500 to-brand-mint opacity-40" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-cyan bg-[#121316] shadow-[0_0_12px_#aed9e0] z-10">
                    <div className="h-2 w-2 rounded-full bg-brand-cyan" />
                  </div>

                  {/* Content Card Container */}
                  <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="group rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-7 shadow-xl hover:border-brand-cyan/40 hover:shadow-2xl hover:shadow-brand-cyan/5 transition-all duration-300">
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-brand-cyan uppercase">
                          {exp.organization}
                        </span>
                        <div className="flex items-center gap-2">
                          {exp.duration && (
                            <span className="flex items-center gap-1 rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                              <Clock className="h-3 w-3" />
                              {exp.duration}
                            </span>
                          )}
                          <Badge variant={exp.type === "Internship" ? "cyan" : "slate"} className="text-[10px]">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>

                      {/* Title & Timeline */}
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-4">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                        {exp.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-mono">
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
