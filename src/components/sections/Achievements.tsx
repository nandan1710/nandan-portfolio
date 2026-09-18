"use client";

import React from "react";
import { achievements } from "@/data/achievements";
import { Badge } from "@/components/ui/Badge";
import { Award, Compass, Music, Zap, Terminal } from "lucide-react";

export const Achievements: React.FC = () => {
  const icons: Record<string, React.ReactNode> = {
    "suttur-jatra": <Compass className="h-5 w-5 text-brand-cyan" />,
    "pid-stabilization": <Zap className="h-5 w-5 text-brand-mint" />,
    "uart-alu-milestone": <Terminal className="h-5 w-5 text-indigo-400" />,
    "music-club": <Music className="h-5 w-5 text-amber-400" />,
  };

  return (
    <section id="achievements" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-500 dark:text-amber-400 font-bold">
            <Award className="h-3.5 w-3.5" />
            <span>05 // HONORS &amp; LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Exhibitions, Milestones &amp; Leadership
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Representing college in technical exhibitions, driving precision hardware achievements, and leading campus creative initiatives.
          </p>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-8 shadow-xl hover:border-brand-cyan/40 hover:shadow-2xl hover:shadow-brand-cyan/5 transition-all duration-300"
            >
              <div>
                {/* Header with icon & metric */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan/10">
                    {icons[ach.id] || <Award className="h-5 w-5 text-brand-cyan" />}
                  </div>

                  {ach.metric && (
                    <Badge variant="cyan" className="text-xs">
                      {ach.metric}
                    </Badge>
                  )}
                </div>

                {/* Subtitle & Title */}
                <div className="text-xs font-mono font-medium text-brand-cyan mb-1">
                  {ach.subtitle}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>CATEGORY: {ach.category}</span>
                <span className="text-brand-mint font-semibold">{ach.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
