"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import {
  Code,
  Cpu,
  Share2,
  Wrench,
  Globe,
  CheckCircle,
  Terminal,
  Sparkles,
} from "lucide-react";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryIcons: Record<string, React.ReactNode> = {
    programming: <Code className="h-4 w-4" />,
    hardware: <Cpu className="h-4 w-4" />,
    protocols: <Share2 className="h-4 w-4" />,
    tools: <Wrench className="h-4 w-4" />,
    web: <Globe className="h-4 w-4" />,
  };

  const filteredCategories =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-3 py-1 text-xs font-mono text-[#0d9488] dark:text-brand-mint font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>02 // TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Hardware, Firmware &amp; Software Toolchain
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Proficiencies categorized across silicon design, bare-metal microcontroller firmware, deterministic serial buses, and modern EDA environments.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-mono font-medium transition-all ${
              activeCategory === "all"
                ? "bg-brand-cyan text-zinc-950 font-bold shadow-md shadow-brand-cyan/25"
                : "border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#16181d] text-zinc-600 dark:text-zinc-300 hover:border-brand-cyan/40"
            }`}
          >
            <span>All Categories</span>
            <span className="rounded-full bg-zinc-800/20 dark:bg-zinc-700/60 px-1.5 py-0.2 text-[10px]">
              {skillCategories.reduce((acc, c) => acc + c.skills.length, 0)}
            </span>
          </button>

          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-brand-cyan text-zinc-950 font-bold shadow-md shadow-brand-cyan/25"
                  : "border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#16181d] text-zinc-600 dark:text-zinc-300 hover:border-brand-cyan/40"
              }`}
            >
              {categoryIcons[category.id]}
              <span>{category.title}</span>
              <span className="rounded-full bg-zinc-800/20 dark:bg-zinc-700/60 px-1.5 py-0.2 text-[10px]">
                {category.skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Category Blocks */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
                    {categoryIcons[category.id]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-light">
                      {category.description}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {category.skills.length} Technologies
                </span>
              </div>

              {/* Skills Grid (No Fake Percentage Bars!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group relative flex flex-col justify-between rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#1a1d24]/60 p-4 hover:border-brand-cyan/40 hover:bg-zinc-100/80 dark:hover:bg-[#1a1d24] hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-200"
                  >
                    <div>
                      {/* Name & Badge */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan transition-colors">
                          {skill.name}
                        </span>
                        {skill.badge && (
                          <Badge
                            variant={
                              skill.badge === "Primary" || skill.badge === "Featured"
                                ? "cyan"
                                : skill.badge === "Core"
                                ? "mint"
                                : "slate"
                            }
                            className="text-[10px] px-2 py-0"
                          >
                            {skill.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Technical Description */}
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light mb-3">
                        {skill.description}
                      </p>
                    </div>

                    {/* Footer tag */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                      <span>SCOPE:</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                        {skill.tag || "Standard"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
