import { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    id: "kt-semicon",
    title: "RTL and Design Verification Course",
    organization: "KT Semicon",
    period: "2026",
    type: "Coursework & Training",
    description: "Intensive training in Verilog RTL synthesis, SystemVerilog verification fundamentals, FSM state design, and QuestaSim functional coverage analysis.",
    highlights: [
      "Rigorous RTL coding methodologies for synchronous and asynchronous sequential circuits",
      "Directed and constrained-random testbench development in QuestaSim",
      "Waveform timing analysis, setup/hold slack debugging, and coverage metrics",
      "Verification of complex memory controllers, FIFOs, and arithmetic blocks"
    ]
  },
  {
    id: "1xsoft",
    title: "Software Engineer Intern",
    organization: "1Xsoft Private Limited",
    period: "2026",
    duration: "3 months",
    type: "Internship",
    description: "Contributed to software engineering workflows, backend-hardware interface integration, and structured algorithmic problem solving.",
    highlights: [
      "Engineered reliable software components collaborating across engineering teams",
      "Gained exposure to production codebases, code review practices, and CI/CD pipelines",
      "Optimized data flow and serialization between system services"
    ]
  },
  {
    id: "internpe",
    title: "Embedded Systems Intern",
    organization: "InternPE",
    period: "2026",
    duration: "1 month",
    type: "Internship",
    description: "Hands-on firmware development focusing on microcontroller peripheral programming, serial interfacing, and sensor telemetry.",
    highlights: [
      "Configured embedded hardware timers, interrupt service routines (ISR), and GPIO pins",
      "Implemented communication protocols (UART, I2C) for multi-sensor integration",
      "Conducted on-target testing and oscilloscope/logic analyzer signal verification"
    ]
  },
  {
    id: "vsdfpga",
    title: "RISC-V FPGA IP Development Intern",
    organization: "VSDFPGA",
    period: "2026",
    duration: "15 days",
    type: "Internship",
    description: "Focused on open-source RISC-V processor core microarchitecture, RTL module verification, and FPGA mapping methodologies.",
    highlights: [
      "Explored RISC-V instruction pipeline stages and memory bus interconnects",
      "Verified IP core blocks using open-source EDA toolchains and simulation testbenches",
      "Studied synthesis constraints, logic utilization, and FPGA pin assignments"
    ]
  }
];
