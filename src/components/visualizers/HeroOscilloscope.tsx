"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw, Zap, Activity } from "lucide-react";

export const HeroOscilloscope: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [perturbation, setPerturbation] = useState(0);
  const [telemetry, setTelemetry] = useState({
    tilt: "+0.42°",
    pwm: "64.5%",
    state: "STABLE",
    fsm: "LOOP_OK",
  });

  const perturbationRef = useRef(0);
  const isRunningRef = useRef(true);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const triggerPerturbation = () => {
    perturbationRef.current = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 8);
    setPerturbation(perturbationRef.current);
    setTelemetry(prev => ({ ...prev, state: "RECOVERING", fsm: "PID_CORR" }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const bufferLength = 300;
    const ch1History: number[] = new Array(bufferLength).fill(0);
    const ch2History: number[] = new Array(bufferLength).fill(0);

    const render = () => {
      if (isRunningRef.current) {
        time += 0.08;

        // Damped decay of perturbation back to equilibrium
        perturbationRef.current *= 0.94;
        if (Math.abs(perturbationRef.current) < 0.05) {
          perturbationRef.current = 0;
        }

        // CH1: Inverted pendulum tilt angle (Accelerometer + Gyro fusion)
        const naturalOscillation = Math.sin(time * 0.7) * 0.8 + Math.sin(time * 2.1) * 0.4;
        const noise = (Math.random() - 0.5) * 0.35;
        const currentTilt = naturalOscillation + perturbationRef.current + noise;

        // CH2: STM32 Timer1 PWM duty cycle restoring response
        const pwmResponse = Math.sin(time * 4) > 0 ? 1 : -1;
        const currentPwm = (currentTilt * 0.7 + pwmResponse * 0.4);

        ch1History.shift();
        ch1History.push(currentTilt);
        ch2History.shift();
        ch2History.push(currentPwm);

        // Update telemetry occasionally
        if (Math.floor(time * 10) % 15 === 0) {
          const displayAngle = (currentTilt).toFixed(2);
          const sign = currentTilt >= 0 ? "+" : "";
          const dutyPercent = Math.min(99, Math.max(10, Math.floor(50 + currentTilt * 4.2)));
          setTelemetry({
            tilt: `${sign}${displayAngle}°`,
            pwm: `${dutyPercent}.2%`,
            state: Math.abs(currentTilt) < 2.5 ? "STABLE" : "CORRECTING",
            fsm: Math.abs(currentTilt) < 1.0 ? "STEADY" : "PID_ACTIVE",
          });
        }
      }

      // Drawing
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Grid lines (Oscilloscope reticle)
      ctx.strokeStyle = "rgba(174, 217, 224, 0.08)";
      ctx.lineWidth = 1;

      // Vertical divisions
      const xDiv = width / 10;
      for (let x = 0; x < width; x += xDiv) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal divisions
      const yDiv = height / 6;
      for (let y = 0; y < height; y += yDiv) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = "rgba(174, 217, 224, 0.2)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Channel 1 (MPU6050 Pitch - Cyan Waveform)
      ctx.beginPath();
      ctx.strokeStyle = "#aed9e0";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#aed9e0";
      ctx.shadowBlur = 8;

      const step = width / (bufferLength - 1);
      for (let i = 0; i < bufferLength; i++) {
        const x = i * step;
        const y = midY - ch1History[i] * 5.5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Channel 2 (STM32 PWM - Mint/Green Waveform)
      ctx.beginPath();
      ctx.strokeStyle = "#b8f2e6";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#b8f2e6";
      ctx.shadowBlur = 6;

      for (let i = 0; i < bufferLength; i++) {
        const x = i * step;
        const y = midY + 45 - ch2History[i] * 14;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-brand-cyan/30 bg-[#15171c]/90 p-4 sm:p-5 shadow-2xl shadow-brand-cyan/10 backdrop-blur-xl">
      {/* Scope Header / Rig metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#aed9e0]" />
          <span className="text-xs font-mono font-bold tracking-wider text-brand-cyan">
            DSO-72M // TELEMETRY MONITOR
          </span>
          <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
            STM32F103 @ 72MHz
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerPerturbation}
            className="flex items-center gap-1 rounded border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono text-amber-300 hover:bg-amber-500/20 transition-colors"
            title="Simulate sudden tilt impulse to test PID recovery"
          >
            <Zap className="h-3 w-3" />
            <span>Tilt Impulse</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="rounded border border-zinc-700 bg-zinc-800 p-1 text-zinc-300 hover:text-white transition-colors"
            title={isRunning ? "Pause Waveform" : "Resume Waveform"}
          >
            {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Screen Canvas */}
      <div className="relative my-3 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0f12]">
        <canvas
          ref={canvasRef}
          width={580}
          height={220}
          className="w-full h-[180px] sm:h-[210px] block"
        />

        {/* Legend overlays */}
        <div className="absolute top-2 left-3 flex flex-wrap gap-4 text-[10px] font-mono pointer-events-none">
          <div className="flex items-center gap-1.5 text-brand-cyan bg-black/60 px-2 py-0.5 rounded border border-brand-cyan/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
            CH1: MPU6050 Pitch (200Hz)
          </div>
          <div className="flex items-center gap-1.5 text-brand-mint bg-black/60 px-2 py-0.5 rounded border border-brand-mint/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
            CH2: TIM1 PWM Output (20kHz)
          </div>
        </div>

        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 rounded border border-zinc-800 pointer-events-none">
          TIME: 2.0ms/div · SENS: 100mV/div
        </div>
      </div>

      {/* Live Telemetry Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-2">
          <div className="text-[10px] text-zinc-500 uppercase">Tilt Angle</div>
          <div className="font-bold text-brand-cyan text-sm">{telemetry.tilt}</div>
        </div>
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-2">
          <div className="text-[10px] text-zinc-500 uppercase">Motor PWM Duty</div>
          <div className="font-bold text-brand-mint text-sm">{telemetry.pwm}</div>
        </div>
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-2">
          <div className="text-[10px] text-zinc-500 uppercase">Loop Stability</div>
          <div className="font-bold text-emerald-400 text-sm flex items-center gap-1">
            <Activity className="h-3 w-3" />
            {telemetry.state}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-2">
          <div className="text-[10px] text-zinc-500 uppercase">I2C Fast-Mode</div>
          <div className="font-bold text-zinc-300 text-sm">400 kHz</div>
        </div>
      </div>
    </div>
  );
};
