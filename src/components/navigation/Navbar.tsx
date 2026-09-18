"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FileText, Menu, X, Cpu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps {
  onOpenResumeModal?: () => void;
}

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-[#121316]/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-black/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="#hero"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan font-tech font-bold text-base transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-cyan group-hover:shadow-[0_0_12px_#aed9e0]">
              <Cpu className="h-5 w-5 text-brand-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="font-tech font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan transition-colors">
                NANDAN N N
              </span>
              <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Embedded Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-zinc-300 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-[#181a1f]/70 px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? "text-brand-cyan font-bold bg-brand-cyan/15 shadow-[0_0_10px_rgba(174,217,224,0.15)]"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Resume CTA & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenResumeModal ? (
              <button
                onClick={onOpenResumeModal}
                className="flex items-center gap-1.5 rounded-full border border-brand-cyan/50 bg-brand-cyan/15 px-4 py-1.5 text-xs font-mono font-bold text-brand-cyan hover:bg-brand-cyan/25 hover:shadow-[0_0_15px_rgba(174,217,224,0.25)] transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume</span>
              </button>
            ) : (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-brand-cyan/50 bg-brand-cyan/15 px-4 py-1.5 text-xs font-mono font-bold text-brand-cyan hover:bg-brand-cyan/25 hover:shadow-[0_0_15px_rgba(174,217,224,0.25)] transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume</span>
              </a>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-800 p-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onOpenResumeModal={onOpenResumeModal}
      />
    </>
  );
};
