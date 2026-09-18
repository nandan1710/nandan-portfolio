"use client";

import React, { useState } from "react";
import { projects } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProjectModal } from "./ProjectModal";
import {
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    "All",
    "Robotics & Control",
    "FPGA / RTL",
    "Digital Design",
    "IoT & Sensors",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>03 // FEATURED ENGINEERING WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Embedded Systems &amp; RTL Hardware Projects
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Real-time firmware, FPGA microarchitectures, parameterizable FIFOs, and sensory control systems built from foundational engineering principles.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-brand-cyan text-zinc-950 font-bold shadow-md shadow-brand-cyan/25"
                    : "border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#16181d] text-zinc-600 dark:text-zinc-300 hover:border-brand-cyan/40"
                }`}
              >
                <span>{cat}</span>
                <span className="rounded-full bg-zinc-800/20 dark:bg-zinc-700/60 px-1.5 py-0.2 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative flex flex-col justify-between rounded-3xl border transition-all duration-300 overflow-hidden ${
                project.featured
                  ? "border-brand-cyan/40 bg-white dark:bg-[#15171c] shadow-xl shadow-brand-cyan/5 hover:border-brand-cyan hover:shadow-2xl hover:shadow-brand-cyan/10"
                  : "border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/80 hover:border-brand-cyan/40 hover:shadow-xl"
              }`}
            >
              {/* Card Top & Visual Header */}
              <div className="p-6 sm:p-8">
                {/* Header row: Category & Featured Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_6px_#aed9e0]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-brand-cyan uppercase">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <Badge variant="cyan" className="text-[10px]" dot>
                      Featured System
                    </Badge>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan transition-colors mb-1">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-xs font-mono text-zinc-500 mb-4">
                    {project.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6">
                  {project.description}
                </p>

                {/* Key Technical Features List */}
                <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#1a1d24]/60 p-4 mb-6 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                    Core Technical Specifications:
                  </span>
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-850 px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#121316]/50 px-6 sm:px-8 py-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-2 rounded-xl bg-brand-cyan/15 border border-brand-cyan/40 px-4 py-2 text-xs font-mono font-bold text-brand-cyan hover:bg-brand-cyan/25 hover:border-brand-cyan transition-all"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>View Architecture &amp; Waveform</span>
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-brand-cyan transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Architecture & Verification Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
