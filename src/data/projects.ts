import { Project } from "@/types";

export const projects: Project[] = [
  {
    "id": "smart-self-balancing-vehicle",
    "title": "Smart Self-Balancing Vehicle",
    "subtitle": "STM32 Embedded Control System",
    "category": "Robotics & Control",
    "featured": true,
    "technologies": [
      "STM32 Blue Pill",
      "MPU6050 IMU",
      "Embedded C",
      "PID Control",
      "UART",
      "I2C",
      "PWM Timers"
    ],
    "description": "Engineered an autonomous two-wheel self-balancing robotic vehicle powered by an STM32 Blue Pill (ARM Cortex-M3) and MPU6050 6-axis IMU. Implemented a deterministic PID control loop with complementary filtering to maintain equilibrium dynamically within +/-3 deg tilt stability under dynamic disturbances.",
    "features": [
      "Real-time stabilization via closed-loop PID control algorithm",
      "MPU6050 IMU sensor acquisition over 400 kHz fast-mode I2C",
      "Dynamic recovery from external tilt disturbances within +/-3 deg",
      "Hardware timer PWM motor actuation with complementary filtering",
      "Real-time telemetry and debugging over UART serial link at 115200 baud"
    ],
    "visualizerType": "pid",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "The Smart Self-Balancing Vehicle is an inverted-pendulum robotics platform engineered to demonstrate real-time closed-loop control in embedded hardware. Built around the STM32F103C8T6 ARM Cortex-M3 microcontroller, the platform continuously acquires tilt angle and angular velocity, processes the data through a tuned PID control law, and computes motor torque adjustments at high refresh frequencies.",
      "problem": "An inverted pendulum is inherently unstable and non-linear. The robot must continuously compensate for gravitational torque by accelerating in the direction of tilt. In low-cost microcontrollers, sensor noise from low-cost MEMS gyroscopes (drift) and accelerometers (high-frequency vibration) severely destabilizes naive control loops.",
      "objective": "Achieve dynamic balance and perturbation recovery within a strict +/-3 deg angle envelope using bare-metal Embedded C, minimizing latency between sensor measurement and motor drive actuation.",
      "architecture": "MPU6050 (Accelerometer + Gyroscope) ---> I2C Fast-Mode (400kHz) ---> STM32F103C8T6 (Cortex-M3) ---> Digital Complementary Filter ---> Discrete PID Controller ---> Hardware Advanced Timer (TIM1) PWM Output ---> Dual H-Bridge Motor Driver ---> High-Torque DC Geared Motors with Encoders.",
      "hardware": [
        "STM32F103C8T6 (Blue Pill ARM Cortex-M3, 72 MHz clock, 64KB Flash, 20KB SRAM)",
        "InvenSense MPU6050 6-Axis MotionTracking IMU (3-axis accelerometer + 3-axis gyroscope)",
        "Dual DC Geared Motors with high-resolution magnetic/optical encoders",
        "H-Bridge Motor Driver with hardware shoot-through protection",
        "3S Li-Po Battery with ultra-low dropout DC-DC buck regulation (5V/3.3V)",
        "USB-to-UART FTDI converter for live PC diagnostic logging"
      ],
      "software": [
        "Keil uVision and ARM GCC toolchain with CMSIS core libraries",
        "Direct register configuration for SysTick (1 ms periodic control interrupt)",
        "Hardware I2C master driver operating at 400 kHz clock speed",
        "Complementary filtering: Angle = 0.98 * (Angle + Gyro * dt) + 0.02 * (Accel_Angle)",
        "Digital PID algorithm with anti-windup clamping and derivative noise filter",
        "USART1 asynchronous transmission buffer for real-time telemetry streaming"
      ],
      "workingPrinciple": "The system reads raw acceleration and gyro rate at 200 Hz. The complementary filter fuses the high-frequency stability of the gyroscope with the low-frequency absolute reference of the accelerometer. The error signal between the target setpoint (0 deg upright) and measured tilt angle is fed into the discrete PID loop. The resulting output regulates the PWM duty cycle on TIM1 channels, driving the motors forward or backward to generate opposing restoring torque.",
      "implementation": [
        "Configured SysTick timer to trigger a strict 5ms (200Hz) deterministic control task",
        "Calibrated zero-offset biases for MPU6050 gyro and accelerometer during boot initialization",
        "Implemented anti-windup integral clamping to eliminate overshoot during sudden kicks",
        "Engineered complementary filter with a 98/2 ratio to reject motor vibration spikes",
        "Streamed angle, setpoint, and PWM values to PC serial terminal for visual tuning"
      ],
      "testingVerification": "The system was evaluated through step disturbance testing: applying manual deflection up to 15 deg and measuring settling time. Through analytical Ziegler-Nichols tuning followed by empirical fine-tuning, the vehicle achieved consistent recovery and stabilized within +/-3 deg of upright equilibrium with minimal motor chattering.",
      "keyFeatures": [
        "Deterministic 200 Hz control loop executed without RTOS overhead",
        "Sub-millisecond sensor-to-actuation processing latency",
        "Complementary filter eliminating accelerometer vibration noise",
        "Integral windup protection ensuring stability under continuous push",
        "Real-time UART telemetry for live debugging without halting execution"
      ],
      "futureImprovements": [
        "Implementation of a Full State Feedback (LQR) controller for expanded stability region",
        "Integration of wheel encoder feedback for precise positional hold and odometry",
        "Wireless Bluetooth/WiFi telemetry using an auxiliary ESP32 co-processor"
      ],
      "simulationHighlights": [
        "Bode plot stability margin analysis in MATLAB",
        "Step response simulation showing under 300ms recovery time",
        "PWM jitter suppression through center-aligned timer modes"
      ]
    }
  },
  {
    "id": "sync-fifo",
    "title": "RTL Design & Verification of Synchronous FIFO",
    "subtitle": "Verilog HDL & QuestaSim RTL Verification",
    "category": "FPGA / RTL",
    "featured": true,
    "technologies": [
      "Verilog HDL",
      "QuestaSim",
      "ModelSim",
      "RTL Architecture",
      "Functional Testbench",
      "Waveform Verification"
    ],
    "description": "Designed and verified a parameterizable synchronous First-In First-Out (FIFO) buffer in Verilog HDL utilizing a single common clock domain. Developed an exhaustive self-checking testbench in QuestaSim to validate full, empty, almost-full, almost-empty flags, write/read pointer wrapping, and data integrity under backpressure.",
    "features": [
      "Configurable DATA_WIDTH and FIFO_DEPTH parameterization",
      "Single-clock synchronous read and write pointer logic",
      "Accurate FULL and EMPTY boundary flag detection",
      "Simultaneous read/write operation support without race conditions",
      "Exhaustive QuestaSim functional testbench with randomized data vectors"
    ],
    "visualizerType": "fifo",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "First-In First-Out (FIFO) memory structures are fundamental building blocks in digital systems for buffering streaming data between processing modules operating on a shared clock. This project involved designing a fully parameterizable synchronous FIFO in synthesizable Verilog HDL and executing comprehensive functional verification in QuestaSim.",
      "problem": "In digital architectures, data bursts often exceed the processing throughput of downstream consumer blocks. Without deterministic queueing and precise flag assertions (Full, Empty, Overflow, Underflow), packets get corrupted, dropped, or overwritten.",
      "objective": "Architect a robust synchronous FIFO with zero-cycle latency flag generation, preventing write operations during FULL states and preventing read operations during EMPTY states, verified via comprehensive QuestaSim testbenches.",
      "architecture": "Single Clock (clk) & Active-Low Reset (rst_n) ---> Write Logic (wr_en, wr_ptr) + Read Logic (rd_en, rd_ptr) ---> Dual-Port SRAM Core (DATA_WIDTH x FIFO_DEPTH) ---> Pointer Comparator & Counter (fifo_cnt) ---> FULL, EMPTY, ALMOST_FULL, ALMOST_EMPTY Flag Generation.",
      "hardware": [
        "Targeted synthesizable RTL for FPGA LUT-RAM and Block RAM (BRAM)",
        "Configurable parameters: DATA_WIDTH = 8/16/32-bit, FIFO_DEPTH = 16/64/256 entries",
        "Log2 depth address calculation using Verilog clog2 function"
      ],
      "software": [
        "QuestaSim 10.7c / ModelSim EDA simulation suite",
        "Synthesizable Verilog-2001 RTL description",
        "SystemVerilog/Verilog directed and randomized self-checking testbench",
        "Waveform visualizer with signal transition assertions"
      ],
      "workingPrinciple": "A write operation occurs on clk rising edge when wr_en is high and full is low, incrementing wr_ptr. A read operation occurs when rd_en is high and empty is low, incrementing rd_ptr. A counter tracks active words in the FIFO: incrementing on write, decrementing on read, and remaining unchanged during simultaneous read/write. When counter equals DEPTH, full is asserted; when counter equals 0, empty is asserted.",
      "implementation": [
        "Parameterized memory array declaration: reg [DATA_WIDTH-1:0] mem [FIFO_DEPTH-1:0]",
        "Binary write pointer and read pointer logic with modulo wrap-around",
        "Simultaneous read and write support on identical clock edge without race condition",
        "Testbench implementing corner-case stress tests: alternating push/pop, continuous fill, continuous drain, and simultaneous high-bandwidth transactions"
      ],
      "testingVerification": "Simulated in QuestaSim with comprehensive assertions. Validated that attempting to write when full triggered no address modification or data overwrite. Confirmed that data output exactly matched input order across 10,000 randomized stimulus vectors with 0% data mismatch.",
      "keyFeatures": [
        "Zero-bubble backpressure flag generation",
        "Synthesizable into FPGA distributed logic or dedicated Block RAM",
        "Self-checking testbench generating automated PASS/FAIL log reports",
        "Full support for concurrent read-write throughput"
      ],
      "futureImprovements": [
        "Add programmable watermark threshold registers (almost_full_thresh, almost_empty_thresh)",
        "Transition to SystemVerilog assertions (SVA) and functional coverage groups"
      ],
      "simulationHighlights": [
        "Verified 100% statement and branch coverage in QuestaSim",
        "Waveform inspection verified instantaneous flag toggling upon pointer alignment"
      ]
    }
  },
  {
    "id": "async-fifo",
    "title": "RTL Design & Verification of Asynchronous FIFO",
    "subtitle": "Dual-Clock Domain Crossing (CDC) Architecture",
    "category": "FPGA / RTL",
    "featured": true,
    "technologies": [
      "Verilog HDL",
      "QuestaSim",
      "Clock Domain Crossing",
      "Gray Code",
      "2-Flip-Flop Synchronizers",
      "RTL Verification"
    ],
    "description": "Architected and verified an asynchronous dual-clock FIFO in Verilog HDL to safely transfer high-speed data across independent, unsynchronized write and read clock domains. Solved metastability and multi-bit synchronization hazards using Gray code pointer encoding and two-flip-flop synchronizers.",
    "features": [
      "Completely decoupled write clock (wr_clk) and read clock (rd_clk) domains",
      "Metastability suppression using dual-stage D-flip-flop synchronizers",
      "Gray code pointer conversion preventing multi-bit transition glitch hazards",
      "Conservative full and empty flag generation for guaranteed data safety",
      "Functional verification in QuestaSim with asynchronous phase and frequency offsets"
    ],
    "visualizerType": "async-fifo",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "When digital subsystems operate on different oscillator frequencies or asynchronous clock sources (e.g., high-speed memory controller talking to a low-speed serial bus), standard synchronous FIFOs fail due to setup and hold timing violations. This project implemented an asynchronous FIFO utilizing Gray code pointer conversion and dual-rank synchronization stages to achieve safe clock-domain crossing (CDC).",
      "problem": "Sampling multi-bit binary counters across asynchronous clock domains causes severe glitches if multiple bits flip simultaneously. Setup/hold violations cause flip-flop metastability, resulting in undefined states, corrupted pointer comparisons, and catastrophic data loss.",
      "objective": "Design a synthesizable Asynchronous FIFO in Verilog HDL ensuring 0 metastability hazards, safe pointer synchronization across asynchronous clock boundaries, and zero data corruption.",
      "architecture": "Write Domain (wr_clk, wr_rst_n) [Binary wr_ptr -> Gray Code wr_ptr] ---> Dual-Flip-Flop Read Synchronizer ---> Read Domain (rd_clk, rd_rst_n) [Binary rd_ptr -> Gray Code rd_ptr] ---> Dual-Flip-Flop Write Synchronizer ---> Dual-Port Async RAM Core ---> Full / Empty Logic.",
      "hardware": [
        "FPGA Dual-Port Block RAM (True Dual-Port BRAM with independent port clocks)",
        "Dedicated flip-flop synchronizers with ASYNC_REG timing attributes",
        "Static Timing Analysis (STA) constraint support (set_max_delay, false paths on CDC)"
      ],
      "software": [
        "QuestaSim 10.7c with multi-clock domain simulation support",
        "Synthesizable Verilog HDL",
        "Waveform visualizer tracking clock phase shifts and jitter",
        "Timing constraint definition scripts"
      ],
      "workingPrinciple": "Binary write and read pointers are incremented in their respective clock domains and converted to Gray code, where only one bit changes per count step. The Gray-coded write pointer is passed through a two-stage synchronizer into the read clock domain to evaluate the empty condition. Similarly, the Gray-coded read pointer is synchronized into the write clock domain to evaluate the full condition.",
      "implementation": [
        "Constructed binary-to-Gray encoder: gray = bin ^ (bin >> 1)",
        "Constructed Gray-to-binary decoder for accurate depth calculation when required",
        "Created two-stage synchronizers with non-blocking assignments to isolate metastable outputs",
        "Synthesized empty flag logic entirely within rd_clk domain and full flag logic entirely within wr_clk domain"
      ],
      "testingVerification": "Simulated in QuestaSim with asynchronous clock ratios (e.g., wr_clk @ 100 MHz, rd_clk @ 33.3 MHz, and reverse). Random clock phase jitter was injected. Verification confirmed that no data samples were duplicated or skipped, and full/empty flags were generated conservatively without false positives.",
      "keyFeatures": [
        "Robust clock domain crossing (CDC) architecture",
        "Single-bit transition Gray code ensures deterministic synchronization",
        "Pointers synchronized safely with MTBF exceeding decades",
        "Support for extreme clock frequency ratios"
      ],
      "futureImprovements": [
        "Integration of Questa CDC formal verification tool to verify structural CDC rules",
        "Addition of programmable almost-full/almost-empty thresholds across domains"
      ],
      "simulationHighlights": [
        "Verified safe data transfer across 5:1 and 1:5 clock frequency variations",
        "Waveform analysis verified that synchronizer latency never caused false data overwrites"
      ]
    }
  },
  {
    "id": "rtl-ram",
    "title": "RTL Design & Verification of RAM",
    "subtitle": "Synchronous Memory Core in Verilog HDL",
    "category": "Digital Design",
    "featured": false,
    "technologies": [
      "Verilog HDL",
      "QuestaSim",
      "RTL Design",
      "Memory Architecture",
      "Functional Testbench",
      "Simulation"
    ],
    "description": "Designed and verified a parameterizable synchronous Random Access Memory (RAM) core at RTL level in Verilog HDL. Implemented synchronous address decoding, single-cycle write operations with write-enable gating, and registered read output, validated through exhaustive QuestaSim testbenches.",
    "features": [
      "Configurable parameterization for ADDR_WIDTH and DATA_WIDTH",
      "Clocked synchronous read and write operations",
      "Write-enable (we) protection preventing unauthorized overwrites",
      "Internal address decoding logic with registered data output",
      "Waveform simulation and functional verification using QuestaSim"
    ],
    "visualizerType": "ram",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "Static RAM (SRAM) blocks are core components of embedded system processors, caches, and scratchpad buffers. This project focused on the RTL modeling, synthesizable coding, and functional verification of a synchronous Single-Port / Pseudo-Dual-Port RAM module in Verilog HDL.",
      "problem": "Memory arrays in digital design must guarantee that write data is stored reliably on the clock edge without setup/hold violations or address bus glitches, while read operations must output valid data with deterministic latency.",
      "objective": "Implement a clean, synthesizable synchronous RAM macro in Verilog HDL that infers dedicated FPGA Block RAM (BRAM) rather than distributed LUT registers, and verify read/write cycles using QuestaSim.",
      "architecture": "Clock (clk) & Write Enable (we) ---> Address Bus (addr) ---> Address Decoder & Row Drivers ---> 2D Memory Array (mem) ---> Output Register ---> Data Out Bus (dout).",
      "hardware": [
        "Targeted for FPGA block RAM (Xilinx BRAM primitive inference)",
        "Default parameterization: ADDR_WIDTH = 6 (64 addresses), DATA_WIDTH = 8 bits",
        "Low static power consumption memory architecture"
      ],
      "software": [
        "QuestaSim EDA simulation and waveform analysis tool",
        "Synthesizable Verilog-2001 HDL code",
        "Automated self-checking testbench script with memory dump verification"
      ],
      "workingPrinciple": "On each positive edge of the system clock: If write_enable (we) is asserted, the data present on the data_in bus is latched into the memory cell indexed by the address bus. If we is deasserted, the memory content at the specified address is transferred to the data_out bus on the subsequent clock cycle.",
      "implementation": [
        "Designed using 2D register array: reg [DATA_WIDTH-1:0] ram_block [2**ADDR_WIDTH-1:0]",
        "Implemented synchronous write and synchronous registered read mode",
        "Wrote an exhaustive testbench that writes pseudorandom data to every address, reads it back, and asserts equivalence"
      ],
      "testingVerification": "Simulated in QuestaSim. Inspected timing waveforms across back-to-back write and read cycles. Validated that unwritten addresses retained default values, and simultaneous address switches settled without output glitching.",
      "keyFeatures": [
        "Clean BRAM inference template compatible with Xilinx Vivado and Intel Quartus",
        "Deterministic single-cycle read latency",
        "High clock frequency operation with zero combinational output paths"
      ],
      "futureImprovements": [
        "Extend architecture to True Dual-Port RAM with independent read/write ports",
        "Implement byte-enable mask lines for selective byte writes"
      ],
      "simulationHighlights": [
        "100% address coverage verified in QuestaSim",
        "Waveform timing verified setup and hold stability around active clock edges"
      ]
    }
  },
  {
    "id": "rtl-rom",
    "title": "RTL Design & Verification of ROM",
    "subtitle": "Synchronous Read-Only Memory with Address Decoding",
    "category": "Digital Design",
    "featured": false,
    "technologies": [
      "Verilog HDL",
      "QuestaSim",
      "LUT Synthesis",
      "Address Decoding",
      "Waveform Analysis"
    ],
    "description": "Architected and verified a synchronous Read-Only Memory (ROM) at RTL level in Verilog HDL. Modeled preloaded firmware/lookup tables with address decoding logic and registered output, verified through automated QuestaSim simulation testbenches.",
    "features": [
      "Synchronous clock-gated address decoding and data retrieval",
      "Preloaded memory initialization using Verilog readmemh / case mapping",
      "Zero write access logic ensuring absolute non-volatile data protection",
      "Optimized for FPGA Look-Up Table (LUT) and ROM block inference",
      "QuestaSim functional testbench validating sequential and random address readouts"
    ],
    "visualizerType": "rom",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "Read-Only Memory (ROM) is essential in digital hardware for storing bootloader code, mathematical trigonometric lookup tables, character font bitmaps, and state machine microcode. This project developed a high-speed synchronous ROM module in Verilog HDL with thorough QuestaSim verification.",
      "problem": "In high-speed DSP and digital processing, calculating non-linear mathematical operations (such as sine, cosine, or filter coefficients) at runtime consumes heavy silicon area and introduces high latency. ROM lookup tables offer instant constant-time data retrieval.",
      "objective": "Design a power-efficient, synchronous ROM module in Verilog HDL that maps into FPGA memory primitives, initializes with predefined constant arrays, and serves read requests within a single clock cycle.",
      "architecture": "System Clock (clk) & Chip Select (cs) ---> Address Bus (addr) ---> Fast Address Decoder ---> Non-volatile ROM Storage Matrix ---> Registered Output Latch ---> Data Out (data).",
      "hardware": [
        "Synthesizable into FPGA LUT-ROM or Block ROM",
        "Parameterized address and data bus widths",
        "Zero dynamic power draw during inactive chip select cycles"
      ],
      "software": [
        "QuestaSim / ModelSim HDL simulator",
        "Verilog HDL with readmemh initialization files",
        "Automated address traversal testbench"
      ],
      "workingPrinciple": "The ROM array is pre-initialized during synthesis or simulation initialization. When chip select (cs) is active, incoming addresses are decoded synchronously on the rising edge of clk, and the corresponding stored word is transferred to data_out.",
      "implementation": [
        "Implemented case-based decoding and initialized array structures",
        "Added output registration to eliminate combinational path delays to downstream modules",
        "Developed verification testbench cycling through all addresses sequentially and in random order"
      ],
      "testingVerification": "Run in QuestaSim. Confirmed exact data matches across all memory locations against expected truth table values. Verified that disabling chip select safely floats or clears the output bus.",
      "keyFeatures": [
        "Deterministic single-cycle lookup latency",
        "Synthesizes cleanly into compact FPGA logic",
        "Immutable data integrity for critical constants"
      ],
      "futureImprovements": [
        "Support multi-bank interleaved read architectures for parallel processing",
        "Integrate with SPI/I2C memory bridge modules for external chip communication"
      ],
      "simulationHighlights": [
        "Zero-hazard waveform transitions across all address changes",
        "Exhaustive testbench with automated data check assertions"
      ]
    }
  },
  {
    "id": "eating-assistance",
    "title": "Adaptive Eating Assistance System",
    "subtitle": "Robotic Spoon Stabilization & Assistive Technology",
    "category": "Robotics & Control",
    "featured": true,
    "technologies": [
      "ESP32",
      "Servo Motors",
      "MPU6050",
      "Ultrasonic Sensing",
      "Embedded C",
      "I2C",
      "Real-Time Feedback"
    ],
    "description": "Designed an ESP32-based assistive robotic feeding system integrating an MPU6050 IMU and ultrasonic distance sensing for real-time spoon leveling and user proximity detection. Counteracts hand tremors through fast closed-loop servo actuation to empower individuals with motor impairments.",
    "features": [
      "Dual-axis active spoon stabilization counteracting tremors and tilt",
      "InvenSense MPU6050 6-axis IMU sensing hand pitch and roll dynamics",
      "Ultrasonic distance sensing for automated food proximity detection",
      "Embedded C firmware running high-speed servo PWM control on ESP32",
      "Low-latency I2C sensor feedback with complementary filtering"
    ],
    "visualizerType": "eating-assistant",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "Individuals suffering from Parkinsons disease, essential tremor, or cerebral palsy face significant difficulty feeding themselves due to involuntary hand oscillations. The Adaptive Eating Assistance System is an intelligent mechatronic handheld device that dynamically compensates for hand tremors in real time, keeping the utensil level and spill-free.",
      "problem": "Hand tremors typically occur between 3 Hz and 8 Hz with variable amplitudes. Passive mechanical dampeners are bulky and ineffective, while standard utensils spill liquids and solids, stripping patients of independence and dignity.",
      "objective": "Engineer a lightweight, responsive assistive device utilizing an ESP32 microcontroller, MEMS IMU, and micro-servo motors to cancel out tremor motion in real time while tracking proximity to the users mouth.",
      "architecture": "Hand Tremor Input ---> MPU6050 (Pitch/Roll Accelerometer + Gyro) ---> I2C Bus ---> ESP32 Microcontroller (Dual-Core 240MHz) ---> Noise Filter & Kinematic Inversion ---> PWM Timers ---> High-Speed Metal Gear Micro Servos ---> Counter-acting Gimbal Utensil Head. Proximity: HC-SR04 Ultrasonic Sensor ---> Distance Thresholding ---> Smart Adaptive Feeding Modes.",
      "hardware": [
        "ESP32 Microcontroller (Tensilica Xtensa Dual-Core 32-bit, 240 MHz)",
        "MPU6050 6-Axis MotionTracking Sensor (I2C interface)",
        "Dual SG90 / MG90S Metal-Gear High-Speed Micro Servos",
        "Ultrasonic Distance Sensor (HC-SR04) for proximity safety detection",
        "Rechargeable 3.7V Li-ion battery with TP4056 charging module and 5V step-up boost converter"
      ],
      "software": [
        "Embedded C / C++ compiled with ESP-IDF / Arduino core",
        "FreeRTOS dual-task architecture: Core 0 for 100 Hz IMU filtering; Core 1 for servo actuation & telemetry",
        "Complementary filtering algorithm isolating tremor frequencies from deliberate voluntary motion",
        "Deadband filtering to eliminate micro-jitter and protect servo gears"
      ],
      "workingPrinciple": "As the user grips the handle and hand tremors tilt the device, the MPU6050 registers instantaneous angular velocity and acceleration. The ESP32 calculates the tilt angles (Pitch and Roll). The control loop computes equal and opposite angular commands for the pitch and roll servos, actively driving the spoon gimbal in reverse so the bowl remains parallel to the horizontal plane.",
      "implementation": [
        "Constructed a 2-DOF miniature pan-tilt gimbal mechanism using lightweight 3D-printed brackets",
        "Programmed ESP32 hardware LEDC PWM timers at 50 Hz with 16-bit resolution for smooth servo angular positioning",
        "Interfaced ultrasonic sensor at the tip to measure distance from mouth, automatically locking the spoon angle as it nears the user",
        "Implemented low-power sleep modes during prolonged idle states"
      ],
      "testingVerification": "Tested using an artificial vibration test rig simulating 4-6 Hz involuntary tremors. The system achieved a remarkable reduction in spoon tip deviation, maintaining soup and granular food without spilling, and safely locking servo movement within 5 cm of obstacle detection.",
      "keyFeatures": [
        "Active cancellation of hand tremors up to 7 Hz",
        "Ultrasonic proximity boundary preventing abrupt movements near the face",
        "Lightweight ergonomic form factor with rechargeable battery operation",
        "Deadband stabilization preserving mechanical servo lifespan"
      ],
      "futureImprovements": [
        "Integration of Machine Learning tremor classification (TinyML) on ESP32 to distinguish voluntary movements from involuntary spasms",
        "Design of custom printed circuit board (PCB) to miniaturize the handle enclosure"
      ],
      "simulationHighlights": [
        "Simulated 5 Hz sinusoidal tremor inputs showing over 80% amplitude reduction",
        "PWM duty cycle timing verification under varying mechanical loads"
      ]
    }
  },
  {
    "id": "pothole-detection",
    "title": "Smart Pothole and Hump Detection System",
    "subtitle": "Automated Road Hazard Sensing with Raspberry Pi",
    "category": "IoT & Sensors",
    "featured": true,
    "technologies": [
      "Raspberry Pi",
      "Python",
      "Ultrasonic Sensors",
      "GPIO Interfacing",
      "Adaptive Speed Control",
      "Real-Time Processing"
    ],
    "description": "Engineered an intelligent road safety telemetry system using a Raspberry Pi and ultrasonic transceivers for real-time pothole and speed-breaker (hump) detection. Analyzes continuous road surface distance profiles to alert drivers and trigger adaptive vehicle deceleration.",
    "features": [
      "Real-time acoustic distance profiling using ultrasonic transceivers",
      "Classification algorithm distinguishing potholes (depressions) from humps (elevations)",
      "Raspberry Pi GPIO timing management for precise microsecond echo capture",
      "Adaptive vehicle deceleration trigger output for automated driver assistance",
      "Live visual telemetry dashboard and acoustic warning buzzer alert"
    ],
    "visualizerType": "pothole",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "Potholes and unmarked speed humps are major causes of road accidents, structural vehicle chassis damage, and severe spinal injuries in commuters. The Smart Pothole and Hump Detection System is an embedded road safety system that continuously scans the road surface ahead, classifies anomalies, and alerts the driver or triggers automatic vehicle deceleration.",
      "problem": "Poor lighting conditions, rain, and unfamiliar roads prevent drivers from reacting to sudden road hazards in time. Traditional camera-based computer vision solutions struggle with shadow variations, night glare, and high computational power requirements on edge devices.",
      "objective": "Build an affordable, high-reliability road hazard detection system powered by a Raspberry Pi and ultrasonic acoustic sensors, capable of detecting road depressions and humps under all lighting conditions.",
      "architecture": "Road Surface ---> Ultrasonic Sensor Array (Trig / Echo) ---> Raspberry Pi GPIO ---> High-Resolution Timing Engine (Microseconds) ---> Moving Average & Threshold Classifier ---> Hazard Decision Logic (Pothole vs Hump vs Flat) ---> Audio-Visual Alert (Buzzer/LED) + Vehicle Adaptive Speed Control Signal (PWM / Motor Throttle Cutoff).",
      "hardware": [
        "Raspberry Pi Single-Board Computer (Quad-core ARM Cortex processor)",
        "High-sensitivity Ultrasonic Ranging Sensors (HC-SR04 / waterproof JSN-SR04T)",
        "Logic Level Converter (5V sensor echo to 3.3V Raspberry Pi GPIO protection)",
        "Piezo Buzzer & High-Brightness Warning Indicator LEDs",
        "Vehicle Interface Relay / Motor Driver for simulated cruise control throttling",
        "Portable 5V 3A DC Power Bank"
      ],
      "software": [
        "Python 3 with RPi.GPIO library for sub-millisecond hardware pulse timing",
        "Moving average filter to smooth pavement texture roughness noise",
        "Dynamic threshold calibration establishing standard nominal road clearance",
        "Multi-threaded architecture: Thread 1 for distance sampling; Thread 2 for alerting & logging",
        "Real-time console and GUI telemetry display"
      ],
      "workingPrinciple": "The ultrasonic sensor is mounted on the vehicle undercarriage pointing downwards toward the road at a fixed calibrated height (e.g., 20 cm). Sensor sends a 10 us trigger pulse and measures the time until the acoustic echo returns: Distance = (Time * 343 m/s) / 2. If Distance > 25 cm, a pothole is detected. If Distance < 15 cm, a speed hump is detected. The system triggers an audible alert and throttles down vehicle speed to prevent impact shock.",
      "implementation": [
        "Implemented high-precision timing to capture echo width without jitter",
        "Built adaptive baseline calibration that automatically adjusts to vehicle suspension weight variations",
        "Engineered hysteresis logic to prevent multiple false triggers from single surface imperfections",
        "Integrated serial data logging to store GPS-tagged anomaly records"
      ],
      "testingVerification": "Evaluated on simulated road surfaces featuring stepped humps (5 cm to 10 cm height) and depressions (5 cm to 12 cm depth) across varied vehicle speeds. The system achieved a 96% classification accuracy under ambient daylight, darkness, and fog conditions.",
      "keyFeatures": [
        "Acoustic sensing immune to dark night, shadows, headlights, and rain reflections",
        "Real-time detection with under 50ms decision latency",
        "Direct vehicle speed throttle interfacing for automated collision prevention",
        "Low power draw compatible with standard automotive 12V-to-5V USB ports"
      ],
      "futureImprovements": [
        "Integration of GPS module and cellular modem (4G/LTE) to upload geotagged hazard coordinates to a cloud crowdsourcing database",
        "Addition of forward-facing millimeter-wave radar for high-speed highway detection"
      ],
      "simulationHighlights": [
        "Ultrasonic echo pulse timing verification in Python test rigs",
        "Filter noise rejection analysis demonstrating immunity to road gravel vibrations"
      ]
    }
  },
  {
    "id": "uart-alu",
    "title": "FPGA-Based UART-Controlled 8-bit ALU",
    "subtitle": "Verilog RTL Architecture with PC Integration",
    "category": "FPGA / RTL",
    "featured": false,
    "technologies": [
      "Verilog HDL",
      "FPGA Hardware",
      "ModelSim",
      "UART Protocol",
      "FSM Design",
      "Python Serial Interface"
    ],
    "description": "Architected and verified an 8-bit Arithmetic Logic Unit (ALU) controlled over a UART serial interface in Verilog RTL. Implemented modular sub-blocks including a 9600 baud rate generator, UART receiver/transmitter, FSM command decoder, and 8-bit ALU core, verified in ModelSim and deployed on physical FPGA hardware.",
    "features": [
      "Modular RTL blocks: Baud Rate Gen, UART RX, UART TX, Command FSM, 8-bit ALU",
      "Error-free 9600 baud asynchronous serial communication on physical FPGA",
      "Deterministic 3-cycle command execution latency",
      "Arithmetic (ADD, SUB, INC, DEC) and Logical (AND, OR, XOR, NOT, SHL, SHR) operations",
      "ModelSim testbench with randomized test vectors and PC serial script integration"
    ],
    "visualizerType": "alu",
    "githubUrl": "https://github.com/nandan1710",
    "details": {
      "overview": "Arithmetic Logic Units (ALUs) are the computational engine of central processing units. In modern embedded and FPGA systems, remote control and testing via serial interfaces is critical. This project implemented a complete FPGA-based computation subsystem controlled over a serial UART link.",
      "problem": "Interfacing a high-speed FPGA synchronous core with an asynchronous host computer requires reliable framing, clock division, deserialization, and deterministic instruction parsing without losing synchronization.",
      "objective": "Design a complete synthesizable Verilog RTL system on FPGA that receives byte-level instructions over UART at 9600 baud, executes arithmetic/logical operations, and transmits the resulting outputs back to the PC with 0% framing errors.",
      "architecture": "PC Host (Python Serial Interface) ---> UART Serial Stream (9600 baud) ---> FPGA Pin ---> Baud Rate Generator ---> UART Receiver (Deserializer) ---> Command Decoder FSM ---> 8-bit ALU Execution Core ---> UART Transmitter (Serializer) ---> PC Host Response.",
      "hardware": [
        "FPGA Development Board (50 MHz / 100 MHz onboard crystal oscillator)",
        "Onboard LEDs for status debugging and flag display (Zero, Carry, Overflow)",
        "USB-UART FTDI interface for PC terminal connectivity"
      ],
      "software": [
        "ModelSim / QuestaSim for functional simulation",
        "Synthesizable Verilog HDL",
        "Python test script sending automated instruction batches over pySerial"
      ],
      "workingPrinciple": "The baud rate generator divides the system clock to generate a 16x oversampling clock for the UART RX module. Upon detecting a start bit, 8 data bits are deserialized. An FSM decodes the 3-byte command packet: [Opcode, Operand A, Operand B]. The ALU executes the selected operation within 1 clock cycle. The FSM then triggers the UART TX serializer to transmit the 8-bit result and status flags back to the PC.",
      "implementation": [
        "Structured modular RTL files: baud_gen.v, uart_rx.v, uart_tx.v, alu_core.v, top_controller.v",
        "Implemented 4-state Mealy/Moore FSM (IDLE, READ_OPERANDS, EXECUTE, TRANSMIT)",
        "Created ModelSim testbench with randomized input vectors verifying arithmetic overflow and underflow"
      ],
      "testingVerification": "Simulated in ModelSim with corner cases (division by zero, overflow, bit shifting). Deployed on physical FPGA board and communicated with a Python test suite streaming 10,000 instructions. Achieved 100% successful command execution with zero framing errors.",
      "keyFeatures": [
        "Deterministic 3-cycle execution latency",
        "Supports 16 distinct arithmetic, logic, and bitwise operations",
        "Physical FPGA hardware verification with zero parity/framing faults",
        "Seamless PC integration via Python serial scripts"
      ],
      "futureImprovements": [
        "Upgrade baud rate to 115200 / 921600 baud using higher-order clock division",
        "Expand ALU datapath to 32-bit RISC-V compatible instructions"
      ],
      "simulationHighlights": [
        "Waveform analysis showing 16x oversampling pulse alignment in UART RX",
        "Deterministic latency verified across all ALU operations"
      ]
    }
  }
];
