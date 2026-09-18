import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    description: "Core languages for embedded firmware, digital hardware description, mathematical modeling, and software engineering.",
    skills: [
      { name: "Embedded C", tag: "Firmware", badge: "Primary", description: "Direct register manipulation, bare-metal peripheral drivers, ISRs, memory mapping." },
      { name: "C", tag: "Systems", badge: "Core", description: "Pointers, memory management, bitwise operations, data structures, control logic." },
      { name: "C++", tag: "OOP", badge: "Systems", description: "Object-oriented modular design, hardware abstractions, algorithm implementation." },
      { name: "Verilog HDL", tag: "Hardware", badge: "Primary", description: "RTL design, synthesizable FSMs, synchronous logic, hierarchical testbenches." },
      { name: "Python", tag: "Scripting", badge: "Tooling", description: "Serial telemetry processing, automation, data logging, simulation testbenches." },
      { name: "MATLAB", tag: "Simulation", badge: "Analysis", description: "Control system simulations, transfer function analysis, PID tuning, signal filtering." },
      { name: "Java", tag: "Software", badge: "Core", description: "Object-oriented architecture, data structures, and foundational programming concepts." }
    ]
  },
  {
    id: "hardware",
    title: "Hardware Platforms",
    description: "Microcontrollers, system-on-chips, FPGA architectures, and embedded single-board computers.",
    skills: [
      { name: "STM32 (ARM Cortex-M3)", tag: "Microcontroller", badge: "Featured", description: "STM32F103C8T6 Blue Pill, SysTick, hardware timers, PWM channels, ADC, DMA." },
      { name: "FPGA Platforms", tag: "Digital Logic", badge: "Featured", description: "Xilinx & Altera FPGA boards, LUT mapping, clock division, pin constraints." },
      { name: "Raspberry Pi", tag: "SBC", badge: "Linux", description: "Embedded Linux, GPIO interfacing, multi-threaded sensor polling, serial communication." },
      { name: "ESP32", tag: "SoC", badge: "IoT", description: "Dual-core 240MHz microcontroller, FreeRTOS tasks, hardware PWM, sensor telemetry." },
      { name: "Arduino", tag: "Prototyping", badge: "Rapid Dev", description: "Rapid proof-of-concept testing, peripheral testing, breadboard circuit validation." }
    ]
  },
  {
    id: "protocols",
    title: "Protocols & Interfaces",
    description: "Hardware communication standards, bus architectures, and deterministic peripheral signaling.",
    skills: [
      { name: "UART", tag: "Serial", badge: "Universal", description: "Asynchronous serial communication, baud rate generators, FIFO buffering, framing control." },
      { name: "I2C", tag: "Bus", badge: "400 kHz Fast", description: "Two-wire serial bus, master-slave arbitration, register addressing (MPU6050, EEPROM)." },
      { name: "SPI", tag: "Synchronous", badge: "High Speed", description: "Full-duplex synchronous 4-wire bus, high data throughput, display & flash interfacing." },
      { name: "GPIO", tag: "I/O", badge: "Digital", description: "Push-pull, open-drain, internal pull-up/down resistors, external interrupts." },
      { name: "PWM", tag: "Actuation", badge: "Timer-Based", description: "Variable duty-cycle generation for motor speed control, servo angles, and LED dimming." }
    ]
  },
  {
    id: "tools",
    title: "EDA & Simulation Tools",
    description: "Industry-standard electronic design automation, RTL synthesis, and simulation toolchains.",
    skills: [
      { name: "QuestaSim", tag: "RTL Verification", badge: "Verification", description: "Advanced RTL simulation, functional verification, code coverage, testbench validation." },
      { name: "ModelSim", tag: "EDA", badge: "Simulation", description: "Verilog behavioral simulation, signal waveform analysis, timing glitch detection." },
      { name: "Xilinx Vivado", tag: "FPGA Tool", badge: "Synthesis", description: "RTL elaboration, synthesis, pin placement, bitstream generation, timing analysis." },
      { name: "Intel Quartus", tag: "FPGA Tool", badge: "Synthesis", description: "Altera FPGA development, logic synthesis, RTL viewer, timing constraints." },
      { name: "Keil µVision", tag: "IDE", badge: "Embedded IDE", description: "ARM Cortex-M Embedded C compilation, CMSIS headers, register-level debugging." },
      { name: "Proteus", tag: "Circuit CAD", badge: "Virtual SPICE", description: "Schematic capture, microcontroller simulation, mixed-signal circuit modeling." },
      { name: "Multisim", tag: "SPICE", badge: "Analysis", description: "Analog & digital circuit simulation, frequency response analysis, AC/DC sweeps." }
    ]
  },
  {
    id: "web",
    title: "Web & Software Technologies",
    description: "Frontend and client technologies used for dashboards, hardware telemetry UIs, and software development.",
    skills: [
      { name: "HTML5 & CSS3", tag: "Markup/Style", badge: "Frontend", description: "Modern semantic structure, flexbox/grid layouts, animations, accessibility." },
      { name: "JavaScript", tag: "Frontend", badge: "Language", description: "ES6+ async/await, DOM APIs, event-driven programming, client telemetry." },
      { name: "React", tag: "UI Library", badge: "Modern UI", description: "Component-based architecture, state hooks, reactive UI flows, data visualization." },
      { name: "Bootstrap", tag: "CSS Framework", badge: "Framework", description: "Responsive grid layout systems, rapid mobile-first UI development." },
      { name: "jQuery", tag: "Library", badge: "DOM", description: "DOM manipulation, AJAX asynchronous request handling, event listeners." }
    ]
  }
];
