"use client";

import React from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Cpu, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-[#121316] py-12 text-zinc-500">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <span className="font-tech font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-tight">
                {profile.name}
              </span>
              <p className="text-[11px] font-mono text-zinc-400">
                {profile.role}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <Link href="#hero" className="hover:text-brand-cyan transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-brand-cyan transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-brand-cyan transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-brand-cyan transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="hover:text-brand-cyan transition-colors">
              Experience
            </Link>
            <Link href="#contact" className="hover:text-brand-cyan transition-colors">
              Contact
            </Link>
          </div>

          {/* Social and Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 text-zinc-600 dark:text-zinc-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="h-4 w-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 p-2 text-brand-cyan hover:bg-brand-cyan/20 transition-colors ml-2"
              title="Return to top of page"
              aria-label="Return to top of page"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400 dark:text-zinc-600">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div>
            SJCE Mysore · Embedded Systems &amp; VLSI Design
          </div>
        </div>
      </div>
    </footer>
  );
};
