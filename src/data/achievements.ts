import { AchievementItem } from "@/types";

export const achievements: AchievementItem[] = [
  {
    id: "suttur-jatra",
    title: "Suttur Jatra Science & Technology Exhibition",
    subtitle: "College Technical Project Representative",
    date: "Annual State Exhibition",
    category: "Exhibition",
    description: "Represented SJCE at the prestigious Suttur Jatra Science & Technology Exhibition, demonstrating a live technical embedded engineering project and presenting architecture and operational principles to expert evaluators and general visitors.",
    metric: "College Representative"
  },
  {
    id: "pid-stabilization",
    title: "±3° Dynamic Tilt Stability",
    subtitle: "Real-Time Embedded PID Optimization",
    date: "Project Milestone",
    category: "Technical Milestone",
    description: "Achieved deterministic balancing within ±3° tilt threshold on custom two-wheel inverted pendulum vehicle through analytical PID parameter tuning, complementary filtering, and 400 kHz I2C IMU data polling.",
    metric: "±3° Tilt Precision"
  },
  {
    id: "uart-alu-milestone",
    title: "Deterministic 9600 Baud FPGA Execution",
    subtitle: "Hardware Verification & Deployment",
    date: "RTL Milestone",
    category: "Technical Milestone",
    description: "Successfully synthesized and deployed an 8-bit ALU on physical FPGA hardware with an FSM-based UART controller operating with 0% framing errors and deterministic 3-cycle operation latency.",
    metric: "0% Framing Error"
  },
  {
    id: "music-club",
    title: "Social Media Lead — College Music Club",
    subtitle: "Digital Promotions & Event Coordination",
    date: "Leadership Role",
    category: "Leadership",
    description: "Led digital promotions and coordinated events in team-driven environments, overseeing creative design, content strategy, and multi-channel engagement for university-wide cultural and musical gatherings.",
    metric: "Club Leadership"
  }
];
