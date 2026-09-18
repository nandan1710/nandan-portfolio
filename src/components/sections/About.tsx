"use client";

import React from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import {
  Cpu,
  Layers,
  Radio,
  Sliders,
  CheckCircle2,
  Terminal,
  Activity,
  Code2,
} from "lucide-react";

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: "Real-Time Embedded Firmware",
      tag: "STM32 / Cortex-M3",
      description:
        "Developing bare-metal C drivers, timer interrupt service routines (ISR), SysTick scheduling, and complementary noise filters for deterministic control.",
      specs: ["STM32 Blue Pill", "72 MHz Clock", "Hardware PWM", "FreeRTOS Tasks"],
    },
    {
      icon: Layers,
      title: "Digital Hardware & RTL Design",
      tag: "Verilog / QuestaSim",
      description:
        "Synthesizable RTL design, finite state machines (FSM), synchronous/asynchronous FIFOs with CDC, and QuestaSim functional coverage verification.",
      specs: ["Verilog HDL", "QuestaSim", "ModelSim", "Vivado / Quartus"],
    },
    {
      icon: Radio,
      title: "Communication & Bus Protocols",
      tag: "UART / I2C / SPI",
      description:
        "Mastering deterministic serial protocols: 400 kHz fast-mode I2C for IMU telemetry, multi-clock UART frame deserialization, and high-speed SPI.",
      specs: ["400 kHz I2C", "9600 Baud UART", "Hardware SPI", "GPIO Muxing"],
    },
    {
      icon: Sliders,
      title: "Sensory Systems & PID Control",
      tag: "Closed-Loop Recovery",
      description:
        "Closed-loop feedback control loops, dynamic balancing within ±3° tilt stability, ultrasonic distance profiling, and tremor cancellation gimbals.",
      specs: ["MPU6050 IMU", "Ultrasonic Echo", "PID Anti-Windup", "Servo Control"],
    },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-zinc-200/80 dark:border-zinc-850">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-mono text-brand-cyan font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>01 // ENGINEERING BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Bridging Silicon, Firmware &amp; Control
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Hands-on electronics engineering focused on building robust physical computing systems with deterministic real-time reliability.
          </p>
        </div>

        {/* Narrative & Visual Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Narrative Card */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#16181d] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Engineering Profile &amp; Focus
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  SJCE (JSS Science &amp; Technology University, Mysore)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              <p>
                I am an <strong className="text-zinc-900 dark:text-white font-semibold">Electronics &amp; Instrumentation Engineering undergraduate</strong> specializing in <strong className="text-brand-cyan font-semibold">Embedded Systems and VLSI Design</strong>. My engineering work is grounded in direct hardware implementation—ranging from bare-metal C on ARM Cortex-M microcontrollers to register-transfer level (RTL) Verilog on FPGAs.
              </p>
              <p>
                Rather than treating microcontrollers as black boxes, I write low-level firmware interacting directly with peripheral registers, configure hardware timers for microsecond-precise PWM motor actuation, implement digital complementary filters to eliminate MEMS accelerometer noise, and tune PID control loops to achieve dynamic balancing.
              </p>
              <p>
                In the digital hardware space, I architect parameterizable memory controllers, synchronous and asynchronous FIFO queues solving clock-domain crossing (CDC) metastability, and verify system integrity using comprehensive testbenches in QuestaSim and ModelSim.
              </p>
            </div>

            {/* Resume Checklist */}
            <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>Deterministic 200 Hz control loops</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>400 kHz Fast-Mode I2C Bus Master</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>Gray-code pointer CDC synchronizers</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>QuestaSim RTL functional verification</span>
              </div>
            </div>
          </div>

          {/* Key Metrics / Snapshot Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 p-6 flex flex-col justify-between">
              <div className="text-xs font-mono text-zinc-600 dark:text-zinc-300 uppercase">RTL &amp; HW Projects</div>
              <div className="text-4xl font-extrabold font-tech text-brand-cyan my-3">8+</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Verified in QuestaSim &amp; physical hardware
              </div>
            </div>

            <div className="rounded-2xl border border-brand-mint/30 bg-brand-mint/5 p-6 flex flex-col justify-between">
              <div className="text-xs font-mono text-zinc-600 dark:text-zinc-300 uppercase">Tilt Stability</div>
              <div className="text-4xl font-extrabold font-tech text-brand-mint my-3">±3°</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Optimized PID parameter tuning precision
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 flex flex-col justify-between">
              <div className="text-xs font-mono text-zinc-600 dark:text-zinc-300 uppercase">UART Framing</div>
              <div className="text-4xl font-extrabold font-tech text-indigo-400 my-3">0%</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Error-free 9600 baud execution on FPGA
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 flex flex-col justify-between">
              <div className="text-xs font-mono text-zinc-600 dark:text-zinc-300 uppercase">Internships &amp; Labs</div>
              <div className="text-4xl font-extrabold font-tech text-amber-400 my-3">4</div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                KT Semicon, 1Xsoft, InternPE &amp; VSDFPGA
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#16181d] p-6 hover:border-brand-cyan/40 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                    {pillar.tag}
                  </span>
                </div>

                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  {pillar.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
