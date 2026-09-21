"use client";

import React, { useEffect, useState } from "react";
import { LockKeyhole, X, Cpu, ArrowRight } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Authentication will be connected in the next step.
    console.log("Admin login submitted", {
      username,
      password,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close admin login"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-brand-cyan/30 bg-white/95 shadow-2xl shadow-black/30 dark:bg-[#111318]/95">
        {/* Glow effects */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative p-7 sm:p-8">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-cyan/50 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_30px_rgba(174,217,224,0.18)]">
              <Cpu className="h-8 w-8" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <LockKeyhole className="h-4 w-4 text-brand-cyan" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan">
                Restricted Area
              </span>
            </div>

            <h2
              id="admin-login-title"
              className="font-tech text-2xl font-bold text-zinc-900 dark:text-white"
            >
              Admin Access
            </h2>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in to manage your portfolio content.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
              >
                Username
              </label>

              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-white dark:placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-white dark:placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-brand-cyan/50 bg-brand-cyan/15 px-5 py-3 text-sm font-bold text-brand-cyan transition-all hover:bg-brand-cyan/25 hover:shadow-[0_0_25px_rgba(174,217,224,0.18)]"
            >
              <span>Login</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Secure Admin Interface
          </div>
        </div>
      </div>
    </div>
  );
};
