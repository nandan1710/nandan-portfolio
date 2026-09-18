"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const techPills = [
    "Embedded Systems",
    "Embedded C",
    "STM32 (ARM Cortex-M3)",
    "Raspberry Pi",
    "FPGA Platforms",
    "Verilog HDL",
    "Sensor Interfacing (MPU6050)",
    "Real-Time Firmware",
    "PID Control",
    "Digital Design",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background decorative glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-brand-cyan/60 shadow-[0_0_15px_#aed9e0]" />

        <div className="absolute right-[15%] top-[25%] h-1.5 w-1.5 rounded-full bg-brand-mint/50 shadow-[0_0_12px_#b8f2e6]" />

        <div className="absolute left-[45%] bottom-[15%] h-1 w-1 rounded-full bg-brand-cyan/40" />

        <div className="absolute left-[5%] top-[45%] h-64 w-64 rounded-full bg-brand-cyan/[0.03] blur-3xl" />

        <div className="absolute right-[5%] bottom-[10%] h-72 w-72 rounded-full bg-brand-mint/[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ========================================================= */}
          {/* LEFT — PROFILE IMAGE */}
          {/* ========================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="group relative">

              {/* Large background glow */}
              <div
                className="
                  absolute
                  -inset-6
                  rounded-[2rem]
                  bg-brand-cyan/10
                  blur-3xl
                  opacity-50
                  transition-all
                  duration-500
                  group-hover:bg-brand-mint/20
                  group-hover:opacity-80
                "
              />

              {/* Rotating / decorative border */}
              <div
                className="
                  absolute
                  -inset-3
                  rounded-[1.8rem]
                  border
                  border-brand-cyan/20
                  transition-all
                  duration-500
                  group-hover:border-brand-mint/50
                  group-hover:scale-[1.02]
                "
              />

              {/* Image container */}
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="
                  relative
                  w-64
                  h-64
                  sm:w-72
                  sm:h-72
                  md:w-80
                  md:h-80
                  lg:w-[360px]
                  lg:h-[360px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-brand-cyan/40
                  bg-zinc-900
                  shadow-[0_0_35px_rgba(174,217,224,0.15)]
                  transition-all
                  duration-500
                  group-hover:border-brand-mint/70
                  group-hover:shadow-[0_0_55px_rgba(184,242,230,0.35)]
                "
              >
                <Image
                  src="/Nandan.jpeg"
                  alt="Nandan N N"
                  fill
                  priority
                  className="
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-105
                  "
                  sizes="(max-width: 768px) 288px, 360px"
                />

                {/* Image overlay */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-brand-cyan/5
                    transition-all
                    duration-500
                    group-hover:to-brand-mint/10
                  "
                />

                {/* Inner glowing border */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-2
                    rounded-2xl
                    border
                    border-white/10
                    transition-all
                    duration-500
                    group-hover:border-brand-mint/30
                  "
                />
              </motion.div>

              {/* Small status indicator */}
              <div
                className="
                  absolute
                  -bottom-4
                  left-1/2
                  -translate-x-1/2
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-brand-cyan/30
                  bg-zinc-950/90
                  px-4
                  py-2
                  backdrop-blur-xl
                  shadow-lg
                  transition-all
                  duration-500
                  group-hover:border-brand-mint/50
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-brand-cyan
                    shadow-[0_0_10px_#aed9e0]
                    animate-pulse
                    transition-colors
                    duration-500
                    group-hover:bg-brand-mint
                    group-hover:shadow-[0_0_10px_#b8f2e6]
                  "
                />

                <span className="text-[11px] font-mono text-zinc-300">
                  NANDAN N N
                </span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT — CONTENT */}
          {/* ========================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >

            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />

                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
              </span>

              <span className="text-xs font-mono font-bold tracking-wide text-brand-cyan dark:text-[#aed9e0]">
                ELECTRONICS &amp; INSTRUMENTATION · SJCE MYSORE
              </span>
            </div>

            {/* Name */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-brand-cyan via-brand-mint to-[#d7f5ef] bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-700 dark:text-zinc-200">
                {profile.role}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
              <strong className="font-semibold text-zinc-900 dark:text-zinc-200">
                {profile.tagline}
              </strong>{" "}
              Specializing in deterministic firmware, high-speed serial bus
              protocols (UART/I2C/SPI), synthesizable RTL architectures, and
              sensor integration.
            </p>

            {/* Technical Skills */}
            <div className="flex flex-wrap gap-2 pt-1 max-w-3xl">
              {techPills.map((pill, i) => (
                <Badge
                  key={i}
                  variant={
                    i % 3 === 0
                      ? "cyan"
                      : i % 3 === 1
                        ? "mint"
                        : "slate"
                  }
                  className="text-[11px]"
                >
                  {pill}
                </Badge>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">

              {/* Projects */}
              <Link
                href="#projects"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-brand-cyan
                  px-5
                  py-3
                  text-sm
                  font-mono
                  font-bold
                  text-zinc-950
                  shadow-lg
                  shadow-brand-cyan/25
                  hover:bg-[#b8f2e6]
                  hover:shadow-brand-cyan/40
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                <span>View Projects</span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* Resume */}
              {onOpenResumeModal ? (
                <button
                  onClick={onOpenResumeModal}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-brand-cyan/40
                    bg-brand-cyan/10
                    px-5
                    py-3
                    text-sm
                    font-mono
                    font-bold
                    text-zinc-800
                    dark:text-zinc-200
                    hover:bg-brand-cyan/20
                    hover:border-brand-cyan/60
                    hover:-translate-y-0.5
                    transition-all
                    duration-200
                  "
                >
                  <Download className="h-4 w-4 text-brand-cyan" />
                  <span>Resume</span>
                </button>
              ) : (
                <a
                  href={profile.resumeUrl}
                  download="Nandan_N_N_Resume.pdf"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-brand-cyan/40
                    bg-brand-cyan/10
                    px-5
                    py-3
                    text-sm
                    font-mono
                    font-bold
                    text-zinc-800
                    dark:text-zinc-200
                    hover:bg-brand-cyan/20
                    hover:border-brand-cyan/60
                    hover:-translate-y-0.5
                    transition-all
                    duration-200
                  "
                >
                  <Download className="h-4 w-4 text-brand-cyan" />
                  <span>Download Resume</span>
                </a>
              )}

              {/* Contact */}
              <Link
                href="#contact"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-300
                  dark:border-zinc-800
                  bg-zinc-100
                  dark:bg-zinc-900/60
                  px-5
                  py-3
                  text-sm
                  font-mono
                  font-semibold
                  text-zinc-700
                  dark:text-zinc-300
                  hover:border-zinc-400
                  dark:hover:border-zinc-700
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-zinc-500 dark:text-zinc-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono hover:text-brand-cyan transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>github/nandan1710</span>
              </a>

              <span className="text-zinc-700 dark:text-zinc-600">·</span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono hover:text-brand-cyan transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>linkedin/nandan-nejikar</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};