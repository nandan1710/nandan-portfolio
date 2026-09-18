"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, RotateCcw, Activity } from "lucide-react";

export const PidVisualizer: React.FC = () => {
  const [angle, setAngle] = useState(0); // in degrees
  const [kp, setKp] = useState(18.5);
  const [ki, setKi] = useState(0.6);
  const [kd, setKd] = useState(2.4);
  const [pwmOutput, setPwmOutput] = useState(0);
  const [isStable, setIsStable] = useState(true);

  const stateRef = useRef({
    angle: 0,
    velocity: 0,
    integral: 0,
    prevError: 0,
  });

  const animRef = useRef<number | null>(null);

  const applyPerturbation = (impulse: number) => {
    stateRef.current.angle += impulse;
    setAngle(stateRef.current.angle);
  };

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05); // cap at 50ms
      lastTime = time;

      const state = stateRef.current;
      const targetAngle = 0; // upright vertical
      const error = targetAngle - state.angle;

      // PID Calculation
      state.integral += error * dt;
      // Clamp integral to prevent windup
      state.integral = Math.max(-15, Math.min(15, state.integral));

      const derivative = (error - state.prevError) / (dt || 0.01);
      state.prevError = error;

      const output = kp * error + ki * state.integral + kd * derivative;

      // Inverted Pendulum Dynamics Simulation
      const gravityTorque = 9.81 * Math.sin((state.angle * Math.PI) / 180) * 1.5;
      const netTorque = -output * 0.18 + gravityTorque;

      // Acceleration = Net Torque / Moment of Inertia
      const angularAcc = netTorque / 0.8;
      state.velocity += angularAcc * dt;
      // Natural mechanical damping
      state.velocity *= 0.985;
      state.angle += state.velocity * dt;

      // Update react states
      setAngle(state.angle);
      const clampedPwm = Math.max(-100, Math.min(100, Math.round(output)));
      setPwmOutput(clampedPwm);
      setIsStable(Math.abs(state.angle) < 3.0 && Math.abs(state.velocity) < 2.0);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [kp, ki, kd]);

  const handleReset = () => {
    stateRef.current = {
      angle: 0,
      velocity: 0,
      integral: 0,
      prevError: 0,
    };
    setAngle(0);
    setPwmOutput(0);
  };

  return (
    <div className="rounded-2xl border border-brand-cyan/25 bg-[#14161a] p-5 font-mono text-xs shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_6px_#aed9e0]" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider">
            STM32 PID CONTROL SIMULATOR (Inverted Pendulum)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-bold border transition-colors ${
              isStable
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300 animate-pulse"
            }`}
          >
            {isStable ? "STATUS: BALANCED (±3°)" : "STATUS: RECOVERING"}
          </span>
        </div>
      </div>

      {/* Physics Canvas / Graphic Illustration */}
      <div className="relative my-4 flex h-48 w-full items-center justify-center rounded-xl border border-zinc-800 bg-[#0d0f12] overflow-hidden">
        {/* Ground grid */}
        <div className="absolute bottom-6 w-full border-b border-zinc-700/60" />
        <div className="absolute bottom-3 text-[10px] text-zinc-600 font-mono">
          GROUND PLANE · DETERMINISTIC 200 Hz SAMPLE LOOP
        </div>

        {/* Dynamic Balancing Robot Container */}
        <div
          className="relative flex flex-col items-center transition-transform"
          style={{
            transform: `rotate(${angle.toFixed(1)}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          {/* Pendulum Body / Chassis */}
          <div className="relative flex flex-col items-center">
            {/* Top IMU Board */}
            <div className="rounded border border-brand-cyan/60 bg-brand-cyan/20 px-2 py-0.5 text-[9px] font-bold text-brand-cyan shadow-[0_0_10px_#aed9e0]">
              MPU6050
            </div>
            {/* Vertical Carbon Chassis Standoff */}
            <div className="h-24 w-2 rounded bg-gradient-to-b from-brand-cyan/80 to-zinc-600 shadow-[0_0_8px_rgba(174,217,224,0.3)]" />
            {/* STM32 Microcontroller Core */}
            <div className="rounded border border-brand-mint/60 bg-zinc-900 px-2.5 py-1 text-[9px] font-bold text-brand-mint shadow">
              STM32F103
            </div>
          </div>

          {/* Motor Axle Hub */}
          <div className="relative -mb-4 flex items-center justify-center gap-6 mt-1">
            {/* Left Wheel */}
            <div className="h-9 w-9 rounded-full border-2 border-brand-cyan bg-zinc-950 flex items-center justify-center shadow-lg">
              <div className="h-2 w-2 rounded-full bg-brand-cyan" />
            </div>
            {/* Right Wheel */}
            <div className="h-9 w-9 rounded-full border-2 border-brand-cyan bg-zinc-950 flex items-center justify-center shadow-lg">
              <div className="h-2 w-2 rounded-full bg-brand-cyan" />
            </div>
          </div>
        </div>

        {/* Telemetry Overlay */}
        <div className="absolute top-2 left-3 rounded border border-zinc-800 bg-black/60 px-2 py-1 text-[11px] font-mono">
          <span className="text-zinc-400">Tilt: </span>
          <span className="font-bold text-brand-cyan">{angle.toFixed(2)}°</span>
        </div>

        <div className="absolute top-2 right-3 rounded border border-zinc-800 bg-black/60 px-2 py-1 text-[11px] font-mono">
          <span className="text-zinc-400">Torque: </span>
          <span className={`font-bold ${pwmOutput >= 0 ? "text-brand-mint" : "text-amber-400"}`}>
            {pwmOutput}% PWM
          </span>
        </div>
      </div>

      {/* Impulse Triggers */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => applyPerturbation(-12)}
            className="flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-amber-300 hover:bg-amber-500/20 transition-all"
          >
            <Zap className="h-3 w-3" />
            <span>Kick Left (-12°)</span>
          </button>
          <button
            onClick={() => applyPerturbation(12)}
            className="flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-amber-300 hover:bg-amber-500/20 transition-all"
          >
            <Zap className="h-3 w-3" />
            <span>Kick Right (+12°)</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-zinc-300 hover:text-white transition-all"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Equilibrium</span>
        </button>
      </div>

      {/* Tuner Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-zinc-800 pt-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-400">Proportional (Kp)</span>
            <span className="font-bold text-brand-cyan">{kp}</span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="0.5"
            value={kp}
            onChange={(e) => setKp(parseFloat(e.target.value))}
            className="w-full accent-[#aed9e0] cursor-pointer"
          />
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-400">Integral (Ki)</span>
            <span className="font-bold text-brand-mint">{ki}</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={ki}
            onChange={(e) => setKi(parseFloat(e.target.value))}
            className="w-full accent-[#b8f2e6] cursor-pointer"
          />
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-400">Derivative (Kd)</span>
            <span className="font-bold text-amber-300">{kd}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="6"
            step="0.1"
            value={kd}
            onChange={(e) => setKd(parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
