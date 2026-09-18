"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import { Modal } from "@/components/ui/Modal";
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface ResumeSectionProps {
  isModalOpenExternal?: boolean;
  onCloseModalExternal?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  isModalOpenExternal,
  onCloseModalExternal,
}) => {
  const [internalModalOpen, setInternalModalOpen] = useState(false);

  const isModalOpen = isModalOpenExternal !== undefined ? isModalOpenExternal : internalModalOpen;
  const handleClose = onCloseModalExternal || (() => setInternalModalOpen(false));
  const handleOpen = () => setInternalModalOpen(true);

  return (
    <section id="resume" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-cyan/40 bg-gradient-to-br from-brand-cyan/10 via-white/80 dark:via-[#15171c]/90 to-brand-mint/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          {/* Subtle circuit lines background */}
          <div className="pointer-events-none absolute inset-0 opacity-15 circuit-grid" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 text-xs font-mono font-bold text-brand-cyan">
                <FileText className="h-3.5 w-3.5" />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                Want to know more?
              </h2>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                View my resume for a complete overview of my technical background, academic milestones, and engineering project details.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                  Embedded Systems
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                  Verilog RTL &amp; QuestaSim
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                  STM32 &amp; FPGA
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleOpen}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-cyan px-6 py-3.5 text-sm font-mono font-bold text-zinc-950 shadow-lg shadow-brand-cyan/25 hover:bg-[#b8f2e6] hover:shadow-brand-cyan/40 transition-all duration-200"
              >
                <Eye className="h-4 w-4" />
                <span>View Resume</span>
              </button>

              <a
                href={profile.resumeUrl}
                download="Nandan_NN_Resume.pdf"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3.5 text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 hover:border-brand-cyan/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Download className="h-4 w-4 text-brand-cyan" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Resume Modal Viewer */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Resume — Nandan N N"
        subtitle="Electronics & Instrumentation Engineering Undergraduate"
        maxWidth="max-w-5xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-zinc-500">
              PDF Document · Authoritative Profile
            </span>
            <a
              href={profile.resumeUrl}
              download="Nandan_NN_Resume.pdf"
              className="flex items-center gap-1.5 rounded-lg border border-brand-cyan/50 bg-brand-cyan/15 px-3 py-1.5 text-xs font-mono font-bold text-brand-cyan hover:bg-brand-cyan/25 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>

          {/* Embedded PDF iframe */}
          <div className="w-full h-[75vh] rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-800 bg-zinc-900">
            <iframe
              src={`${profile.resumeUrl}#toolbar=1`}
              className="w-full h-full"
              title="Nandan N N Resume PDF"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
