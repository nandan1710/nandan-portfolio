"use client";

import React from "react";
import { Project } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { FifoVisualizer } from "@/components/visualizers/FifoVisualizer";
import { PidVisualizer } from "@/components/visualizers/PidVisualizer";
import { WaveformViewer } from "@/components/visualizers/WaveformViewer";
import { UltrasonicVisualizer } from "@/components/visualizers/UltrasonicVisualizer";
import {
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Github,
  ExternalLink,
  Target,
  Wrench,
  FileCode,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const renderVisualizer = () => {
    switch (project.visualizerType) {
      case "pid":
        return <PidVisualizer />;
      case "fifo":
        return <FifoVisualizer isAsync={false} />;
      case "async-fifo":
        return <FifoVisualizer isAsync={true} />;
      case "ram":
        return <WaveformViewer type="ram" />;
      case "rom":
        return <WaveformViewer type="rom" />;
      case "alu":
        return <WaveformViewer type="alu" />;
      case "pothole":
        return <UltrasonicVisualizer />;
      case "eating-assistant":
        return <PidVisualizer />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={!!project}
      onClose={onClose}
      title={project.title}
      subtitle={project.subtitle || project.category}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-8">
        {/* Technology Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <Badge
                key={i}
                variant={i === 0 ? "cyan" : i === 1 ? "mint" : "slate"}
                className="text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1.5 text-xs font-mono font-bold text-brand-cyan hover:bg-brand-cyan/20 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>

        {/* Embedded Interactive Engineering Visualizer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            <span>Interactive Hardware / RTL Simulation</span>
          </div>
          {renderVisualizer()}
        </div>

        {/* Overview & Problem Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2.5">
              <Target className="h-4 w-4 text-brand-cyan" />
              <span>Project Overview</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              {project.details.overview}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Engineering Challenge / Problem</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
              {project.details.problem}
            </p>
          </div>
        </div>

        {/* Architecture & Working Principle */}
        <div className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 p-5 sm:p-6 space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            <Layers className="h-4 w-4 text-brand-cyan" />
            <span>System Architecture &amp; Signal Pipeline</span>
          </h4>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0e1014] p-4 font-mono text-xs text-brand-cyan leading-relaxed overflow-x-auto">
            {project.details.architecture}
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
            <strong className="text-zinc-900 dark:text-white font-semibold">Working Principle:</strong>{" "}
            {project.details.workingPrinciple}
          </p>
        </div>

        {/* Hardware & Software Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hardware */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              <Cpu className="h-4 w-4 text-brand-cyan" />
              <span>Hardware Components &amp; Specs</span>
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {project.details.hardware.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-cyan mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Software */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              <FileCode className="h-4 w-4 text-brand-mint" />
              <span>Firmware &amp; Simulation Toolchain</span>
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {project.details.software.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-mint mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Implementation Steps & Verification Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              <Wrench className="h-4 w-4 text-zinc-400" />
              <span>Implementation Highlights</span>
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
              {project.details.implementation.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-cyan font-mono text-[11px] mt-0.5">[{idx + 1}]</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Testing &amp; Verification Results</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-4">
              {project.details.testingVerification}
            </p>
            {project.details.simulationHighlights && (
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] p-3 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase">
                  Verification Metrics:
                </span>
                {project.details.simulationHighlights.map((hl, hIdx) => (
                  <div key={hIdx} className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Future Improvements */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#14161b] p-5">
          <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            <ArrowRight className="h-4 w-4 text-brand-cyan" />
            <span>Future Architectural Improvements</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {project.details.futureImprovements.map((imp, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-mono">
                <span className="h-1 w-1 rounded-full bg-brand-cyan" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
