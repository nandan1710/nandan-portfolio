"use client";

import React from "react";
import { educationList } from "@/data/education";
import { GraduationCap, MapPin, Calendar, Terminal } from "lucide-react";

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan font-bold">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>06 // ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Education &amp; Institution History
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Formal grounding in instrumentation, transducers, digital logic, and electronics at premier technical institutions.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-brand-cyan/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-brand-cyan/15 border border-brand-cyan/30 px-3 py-1 text-xs font-mono font-bold text-brand-cyan">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {edu.degree}
                </h3>
                <div className="text-sm font-semibold text-brand-mint mb-2">
                  {edu.institution}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-4">
                  <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{edu.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                  {edu.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>STATUS: {idx === 0 ? "Undergraduate (In Progress)" : "Completed"}</span>
                <span className="text-brand-cyan font-bold">{idx === 0 ? "Expected 2027" : "2023"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
