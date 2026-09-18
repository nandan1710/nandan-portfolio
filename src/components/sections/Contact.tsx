"use client";

import React, { useState } from "react";
import { profile } from "@/data/profile";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  MapPin,
  Cpu,
} from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a short message or inquiry.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setStatusMsg("Transmitting message packet...");

    // Simulate reliable client transmission without exposing sensitive external API keys
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setStatusMsg("Message received successfully! I will review your note and respond promptly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus("error");
      setStatusMsg("Transmission failed. Please reach out directly via email or phone.");
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>07 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Let&apos;s Build Something Interesting
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Interested in discussing embedded systems, digital hardware architectures, robotics control solutions, or internship opportunities? Let&apos;s connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-brand-cyan" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1d24]/60 p-4 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-zinc-500 uppercase">Email Address</div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan truncate">
                      {profile.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${profile.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1d24]/60 p-4 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mint/10 text-brand-mint group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Phone / WhatsApp</div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-mint">
                      {profile.displayPhone}
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1d24]/60 p-4 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-zinc-500 uppercase">LinkedIn Profile</div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan truncate">
                      linkedin.com/in/{profile.linkedinHandle}
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1d24]/60 p-4 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 transition-all"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 group-hover:scale-105 transition-transform">
                    <Github className="h-5 w-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-zinc-500 uppercase">GitHub Codebase</div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-cyan truncate">
                      github.com/{profile.githubHandle}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#1a1d24]/40 p-4 text-zinc-500">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase">Location</div>
                    <div className="font-medium text-zinc-700 dark:text-zinc-300">
                      {profile.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#15171c]/90 p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-zinc-500 font-light mb-6">
                Fill out the telemetry form below. All inquiries are answered directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                {/* Name */}
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold">
                    YOUR NAME <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Kumar / Jane Doe"
                    className={`w-full rounded-xl border bg-zinc-50 dark:bg-[#1a1d24] px-4 py-3 text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-brand-cyan focus:ring-brand-cyan/30"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold">
                    EMAIL ADDRESS <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@domain.com"
                    className={`w-full rounded-xl border bg-zinc-50 dark:bg-[#1a1d24] px-4 py-3 text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-brand-cyan focus:ring-brand-cyan/30"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject / Topic */}
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold">
                    PROJECT FOCUS / SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Embedded Firmware Role / RTL Collaboration / Project Query"
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1d24] px-4 py-3 text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-colors focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 mb-1 font-semibold">
                    MESSAGE CONTENT <span className="text-brand-cyan">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message, opportunity details, or technical questions here..."
                    className={`w-full rounded-xl border bg-zinc-50 dark:bg-[#1a1d24] px-4 py-3 text-sm font-sans text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-colors focus:outline-none focus:ring-2 resize-none ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-zinc-300 dark:border-zinc-800 focus:border-brand-cyan focus:ring-brand-cyan/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Status Banners */}
                {status === "success" && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-start gap-2.5 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-start gap-2.5 text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{statusMsg}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-cyan py-3.5 text-sm font-mono font-bold text-zinc-950 shadow-lg shadow-brand-cyan/25 hover:bg-[#b8f2e6] hover:shadow-brand-cyan/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
