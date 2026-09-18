"use client";

import React, { useState } from "react";
import { AlertCircle, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

export const UltrasonicVisualizer: React.FC = () => {
  const [roadCondition, setRoadCondition] = useState<"flat" | "pothole" | "hump">("pothole");

  const telemetry = {
    flat: {
      distance: "20.2 cm",
      transitTime: "1178 µs",
      status: "NORMAL ROAD (FLAT)",
      action: "Maintain Nominal Speed (45 km/h)",
      hazardLevel: "SAFE",
      color: "text-brand-mint",
      bg: "border-brand-mint/30 bg-brand-mint/10",
    },
    pothole: {
      distance: "31.4 cm",
      transitTime: "1830 µs",
      status: "ROAD HAZARD: POTHOLE DETECTED",
      action: "Acoustic Buzzer Triggered + Decelerate Vehicle (-15 km/h)",
      hazardLevel: "WARNING",
      color: "text-amber-400",
      bg: "border-amber-500/30 bg-amber-500/10",
    },
    hump: {
      distance: "12.8 cm",
      transitTime: "746 µs",
      status: "ROAD HAZARD: SPEED HUMP DETECTED",
      action: "Acoustic Buzzer Triggered + Adaptive Brake Assist",
      hazardLevel: "CAUTION",
      color: "text-rose-400",
      bg: "border-rose-500/30 bg-rose-500/10",
    },
  };

  const current = telemetry[roadCondition];

  return (
    <div className="rounded-2xl border border-brand-cyan/25 bg-[#14161a] p-5 font-mono text-xs shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_6px_#aed9e0]" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider">
            RASPBERRY PI ULTRASONIC ROAD PROFILER
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
            Speed of Sound c = 343 m/s
          </span>
        </div>
      </div>

      {/* Test Condition Switcher */}
      <div className="my-4 flex flex-wrap gap-2">
        <button
          onClick={() => setRoadCondition("flat")}
          className={`rounded-lg px-3 py-1.5 border transition-all ${
            roadCondition === "flat"
              ? "border-brand-mint/60 bg-brand-mint/20 text-brand-mint font-bold shadow-[0_0_10px_rgba(184,242,230,0.2)]"
              : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Flat Road (Baseline 20cm)
        </button>

        <button
          onClick={() => setRoadCondition("pothole")}
          className={`rounded-lg px-3 py-1.5 border transition-all ${
            roadCondition === "pothole"
              ? "border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Pothole Depression (&gt;25cm)
        </button>

        <button
          onClick={() => setRoadCondition("hump")}
          className={`rounded-lg px-3 py-1.5 border transition-all ${
            roadCondition === "hump"
              ? "border-rose-500/60 bg-rose-500/20 text-rose-300 font-bold shadow-[0_0_10px_rgba(244,63,94,0.2)]"
              : "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Speed Hump Elevation (&lt;15cm)
        </button>
      </div>

      {/* Dynamic Road Cross-section & Acoustic Propagation Visualizer */}
      <div className="relative my-4 flex h-52 w-full flex-col justify-between rounded-xl border border-zinc-800 bg-[#0c0e12] p-4 overflow-hidden">
        {/* Sensor & Vehicle Undercarriage */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-3">
            <div className="rounded border border-brand-cyan/60 bg-brand-cyan/20 px-2.5 py-1 text-brand-cyan font-bold text-[11px] shadow">
              VEHICLE CHASSIS · RPi GPIO
            </div>
            <div className="rounded border border-brand-mint/40 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300">
              HC-SR04 Transceiver (Trig/Echo)
            </div>
          </div>
          <div className="text-[10px] text-zinc-500">SAMPLING: 50 Hz</div>
        </div>

        {/* Acoustic Wave Animation */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-2">
          <div className="flex flex-col items-center gap-1">
            <div className="h-1.5 w-16 rounded-full bg-brand-cyan/80 animate-pulse shadow-[0_0_8px_#aed9e0]" />
            <div className="h-1 w-24 rounded-full bg-brand-cyan/50" />
            <div className="h-0.5 w-32 rounded-full bg-brand-cyan/30" />
          </div>
          <div className="text-[10px] text-brand-cyan font-mono mt-2 bg-black/60 px-2 py-0.5 rounded border border-brand-cyan/20">
            Acoustic Pulse Transit Time: {current.transitTime}
          </div>
        </div>

        {/* Simulated Road Profile Curve */}
        <div className="relative w-full h-12 flex items-end">
          {roadCondition === "flat" && (
            <div className="w-full h-2 rounded bg-zinc-700 shadow" />
          )}

          {roadCondition === "pothole" && (
            <div className="w-full flex items-end">
              <div className="w-1/3 h-2 bg-zinc-700" />
              {/* Depression */}
              <div className="w-1/3 h-8 rounded-b-xl border-b-2 border-amber-500 bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-400">
                POTHOLE (-11.2 cm)
              </div>
              <div className="w-1/3 h-2 bg-zinc-700" />
            </div>
          )}

          {roadCondition === "hump" && (
            <div className="w-full flex items-end">
              <div className="w-1/3 h-2 bg-zinc-700" />
              {/* Elevation */}
              <div className="w-1/3 h-10 rounded-t-2xl border-t-2 border-rose-500 bg-rose-500/20 flex items-center justify-center text-[10px] font-bold text-rose-300">
                SPEED HUMP (+7.4 cm)
              </div>
              <div className="w-1/3 h-2 bg-zinc-700" />
            </div>
          )}
        </div>
      </div>

      {/* Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Measured Distance</div>
          <div className="font-bold text-brand-cyan text-sm">{current.distance}</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Acoustic Flight Time</div>
          <div className="font-bold text-brand-mint text-sm">{current.transitTime}</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Detection Result</div>
          <div className={`font-bold text-sm ${current.color}`}>{current.hazardLevel}</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Processing Engine</div>
          <div className="font-bold text-zinc-300 text-sm">Raspberry Pi (Python)</div>
        </div>
      </div>

      {/* Decision Logic & Actuator Control */}
      <div className={`rounded-lg border p-3 flex items-start gap-2.5 transition-all ${current.bg}`}>
        {roadCondition === "flat" ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
        )}
        <div>
          <div className="font-bold text-zinc-100">{current.status}</div>
          <div className="text-[11px] text-zinc-300 mt-0.5">{current.action}</div>
        </div>
      </div>
    </div>
  );
};
