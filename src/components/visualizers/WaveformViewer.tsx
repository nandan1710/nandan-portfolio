"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Play, RotateCcw } from "lucide-react";

interface WaveformViewerProps {
  type?: "ram" | "rom" | "alu" | "async-fifo";
}

export const WaveformViewer: React.FC<WaveformViewerProps> = ({ type = "ram" }) => {
  const [activeCycle, setActiveCycle] = useState(2);

  const cycles = [0, 1, 2, 3, 4, 5, 6, 7];

  const signalSets = {
    ram: [
      { name: "clk", type: "clock", values: [0, 1, 0, 1, 0, 1, 0, 1] },
      { name: "we (Write Enable)", type: "binary", values: [0, 1, 1, 0, 0, 0, 0, 0] },
      { name: "addr [5:0]", type: "bus", values: ["0x04", "0x04", "0x05", "0x05", "0x04", "0x04", "0x0A", "0x0A"] },
      { name: "data_in [7:0]", type: "bus", values: ["0x00", "0xA5", "0x3F", "0x00", "0x00", "0x00", "0x00", "0x00"] },
      { name: "data_out [7:0]", type: "bus", values: ["0x00", "0x00", "0x00", "0x00", "0xA5", "0xA5", "0x3F", "0x3F"] },
    ],
    rom: [
      { name: "clk", type: "clock", values: [0, 1, 0, 1, 0, 1, 0, 1] },
      { name: "cs (Chip Select)", type: "binary", values: [1, 1, 1, 1, 1, 1, 0, 0] },
      { name: "addr [5:0]", type: "bus", values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05", "0x00", "0x00"] },
      { name: "dout [7:0] (LUT)", type: "bus", values: ["0x00", "0x18", "0x31", "0x4A", "0x61", "0x78", "0xZZ", "0xZZ"] },
    ],
    alu: [
      { name: "clk (50 MHz)", type: "clock", values: [0, 1, 0, 1, 0, 1, 0, 1] },
      { name: "uart_rx_done", type: "binary", values: [0, 1, 0, 0, 0, 1, 0, 0] },
      { name: "fsm_state", type: "bus", values: ["IDLE", "OP_LOAD", "EXEC", "TX_BUSY", "TX_BUSY", "IDLE", "EXEC", "TX_BUSY"] },
      { name: "alu_op [3:0]", type: "bus", values: ["---", "ADD", "ADD", "---", "---", "XOR", "XOR", "---"] },
      { name: "alu_out [7:0]", type: "bus", values: ["0x00", "0x00", "0x8E", "0x8E", "0x8E", "0x00", "0x5C", "0x5C"] },
    ],
    "async-fifo": [
      { name: "wr_clk (100MHz)", type: "clock", values: [0, 1, 0, 1, 0, 1, 0, 1] },
      { name: "wr_ptr_gray", type: "bus", values: ["3'b000", "3'b001", "3'b011", "3'b010", "3'b110", "3'b111", "3'b101", "3'b100"] },
      { name: "rd_clk (33MHz)", type: "clock", values: [0, 0, 1, 1, 0, 0, 1, 1] },
      { name: "sync_rd_ptr_2ff", type: "bus", values: ["3'b000", "3'b000", "3'b001", "3'b001", "3'b011", "3'b011", "3'b010", "3'b010"] },
      { name: "fifo_full_flag", type: "binary", values: [0, 0, 0, 0, 0, 1, 1, 0] },
    ],
  };

  const currentSignals = signalSets[type] || signalSets.ram;

  return (
    <div className="rounded-2xl border border-brand-cyan/25 bg-[#121316] p-4 font-mono text-xs shadow-xl overflow-x-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-mint shadow-[0_0_6px_#b8f2e6]" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider">
            QUESTASIM RTL TIMING WAVEFORM VIEWER
          </span>
        </div>

        {/* Cycle Step Control */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-[11px]">Active Cursor:</span>
          <span className="rounded bg-brand-cyan/15 px-2 py-0.5 text-brand-cyan font-bold border border-brand-cyan/30">
            T{activeCycle} ({(activeCycle * 10).toFixed(0)} ns)
          </span>
          <div className="flex items-center gap-1 ml-2">
            {cycles.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCycle(c)}
                className={`h-5 w-5 rounded text-[10px] font-bold transition-colors ${
                  activeCycle === c
                    ? "bg-brand-cyan text-zinc-950 shadow-[0_0_8px_#aed9e0]"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Waveform Drawing Area */}
      <div className="min-w-[540px] space-y-3 py-2">
        {/* Time ruler */}
        <div className="grid grid-cols-12 gap-1 border-b border-zinc-800 pb-1 text-[10px] text-zinc-500">
          <div className="col-span-3 text-zinc-400">Signal Path</div>
          {cycles.map((c) => (
            <div
              key={c}
              className={`col-span-1 text-center font-mono ${
                activeCycle === c ? "text-brand-cyan font-bold" : ""
              }`}
            >
              {c * 10}ns
            </div>
          ))}
        </div>

        {/* Signal Lines */}
        {currentSignals.map((sig, sigIdx) => (
          <div key={sigIdx} className="grid grid-cols-12 gap-1 items-center">
            {/* Signal Name */}
            <div className="col-span-3 truncate text-zinc-300 font-semibold text-[11px] pr-2">
              {sig.name}
            </div>

            {/* Signal Cycles */}
            {cycles.map((c) => {
              const val = sig.values[c];
              const isSelected = activeCycle === c;

              return (
                <div
                  key={c}
                  onClick={() => setActiveCycle(c)}
                  className={`col-span-1 h-8 cursor-pointer rounded flex items-center justify-center relative border transition-colors ${
                    isSelected
                      ? "border-brand-cyan/60 bg-brand-cyan/10"
                      : "border-zinc-850 bg-zinc-900/30 hover:bg-zinc-800/40"
                  }`}
                >
                  {sig.type === "clock" ? (
                    <div className="w-full flex flex-col justify-center h-full px-0.5">
                      <svg viewBox="0 0 40 24" className="w-full h-5 stroke-[#aed9e0] fill-none">
                        <path
                          d="M 0 20 L 0 4 L 20 4 L 20 20 L 40 20"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ) : sig.type === "binary" ? (
                    <div className="w-full flex items-center justify-center">
                      <span
                        className={`font-bold text-xs ${
                          val === 1
                            ? "text-brand-mint shadow-[0_0_6px_rgba(184,242,230,0.4)]"
                            : "text-zinc-600"
                        }`}
                      >
                        {val}
                      </span>
                    </div>
                  ) : (
                    /* Bus */
                    <div className="w-full truncate text-center px-1">
                      <span className="rounded bg-zinc-800/80 px-1 py-0.5 text-[10px] font-bold text-brand-cyan">
                        {val}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Cycle Summary Note */}
      <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-[11px] text-zinc-400">
        <span className="text-brand-cyan font-bold">TIMING NOTE @ {activeCycle * 10}ns:</span>{" "}
        {type === "ram" && activeCycle < 3
          ? "Write phase active. Address latched on posedge clk. Memory cell array accepts data_in."
          : type === "ram"
          ? "Synchronous read phase. Data from address presented on data_out bus with zero hold violation."
          : type === "rom"
          ? "ROM address decode latency is deterministic single-cycle. Output data fetched from non-volatile LUT table."
          : "FSM state transition verified. Deterministic setup and hold timing maintained across all registers."}
      </div>
    </div>
  );
};
