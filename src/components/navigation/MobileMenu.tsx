"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { FileText, Github, Linkedin, Mail, Phone } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; href: string }>;
  activeSection: string;
  onOpenResumeModal?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onOpenResumeModal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-[65px] z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#15171c]/95 backdrop-blur-2xl p-6 shadow-2xl lg:hidden"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const id = item.href.substring(1);
              const isActive = activeSection === id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`rounded-xl px-4 py-3 text-sm font-mono transition-all ${
                    isActive
                      ? "border border-brand-cyan/40 bg-brand-cyan/15 text-brand-cyan font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Highlighted Resume Action */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            {onOpenResumeModal ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenResumeModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-cyan/50 bg-brand-cyan/20 py-3 text-sm font-mono font-bold text-brand-cyan shadow-[0_0_15px_rgba(174,217,224,0.2)]"
              >
                <FileText className="h-4 w-4" />
                <span>View / Download Resume</span>
              </button>
            ) : (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-cyan/50 bg-brand-cyan/20 py-3 text-sm font-mono font-bold text-brand-cyan shadow-[0_0_15px_rgba(174,217,224,0.2)]"
              >
                <FileText className="h-4 w-4" />
                <span>View / Download Resume</span>
              </a>
            )}

            {/* Quick Contact Icons */}
            <div className="flex items-center justify-around pt-2 text-zinc-500 dark:text-zinc-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-brand-cyan transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-brand-cyan transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 hover:text-brand-cyan transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="p-2 hover:text-brand-cyan transition-colors"
                aria-label="Phone Contact"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
