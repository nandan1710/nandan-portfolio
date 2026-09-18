"use client";

import React, { useState } from "react";
import { ArrowDownRight, ArrowUpRight, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

const MAX_DEPTH = 8;
const INITIAL_DATA = ["0xA1", "0x5C", "0x3F"];

export const FifoVisualizer: React.FC<{ isAsync?: boolean }> = ({ isAsync = false }) => {
  const [memory, setMemory] = useState<(string | null)[]>(() => {
    const arr = new Array(MAX_DEPTH).fill(null);
    INITIAL_DATA.forEach((val, i) => {
      arr[i] = val;
    });
    return arr;
  });

  const [wrPtr, setWrPtr] = useState(3);
  const [rdPtr, setRdPtr] = useState(0);
  const [count, setCount] = useState(3);
  const [lastAction, setLastAction] = useState<string>(
    "System reset complete. FIFO initialized with 3 test vectors."
  );
  const [lastReadVal, setLastReadVal] = useState<string | null>(null);

  const isFull = count === MAX_DEPTH;
  const isEmpty = count === 0;
  const isAlmostFull = count === MAX_DEPTH - 1;
  const isAlmostEmpty = count === 1;

  const handlePush = () => {
    if (isFull) {
      setLastAction("ERROR: Overflow blocked. Attempted write while FIFO FULL!");
      return;
    }

    const randomHex = "0x" + Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, "0");
    const nextMem = [...memory];
    nextMem[wrPtr] = randomHex;

    const nextWr = (wrPtr + 1) % MAX_DEPTH;
    const nextCount = count + 1;

    setMemory(nextMem);
    setWrPtr(nextWr);
    setCount(nextCount);
    setLastAction(
      `WRITE: Wrote ${randomHex} at addr[${wrPtr}]. wr_ptr advanced to ${nextWr}. (Count: ${nextCount}/${MAX_DEPTH})`
    );
  };

  const handlePop = () => {
    if (isEmpty) {
      setLastAction("ERROR: Underflow blocked. Attempted read while FIFO EMPTY!");
      return;
    }

    const val = memory[rdPtr];
    const nextMem = [...memory];
    nextMem[rdPtr] = null;

    const nextRd = (rdPtr + 1) % MAX_DEPTH;
    const nextCount = count - 1;

    setMemory(nextMem);
    setRdPtr(nextRd);
    setCount(nextCount);
    setLastReadVal(val);
    setLastAction(
      `READ: Popped ${val} from addr[${rdPtr}]. rd_ptr advanced to ${nextRd}. (Count: ${nextCount}/${MAX_DEPTH})`
    );
  };

  const handleReset = () => {
    setMemory(new Array(MAX_DEPTH).fill(null));
    setWrPtr(0);
    setRdPtr(0);
    setCount(0);
    setLastReadVal(null);
    setLastAction("RESET: Active-low rst_n asserted. Pointers cleared to 0. Empty asserted.");
  };

  return (
    <div className="rounded-2xl border border-brand-cyan/25 bg-[#14161a] p-5 font-mono text-xs shadow-xl">
      {/* Title & Domain mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_6px_#aed9e0]" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider">
            {isAsync ? "ASYNC FIFO CDC EMULATOR (Dual Clock)" : "SYNCHRONOUS FIFO RTL SIMULATOR"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAsync && (
            <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[11px] text-indigo-300 border border-indigo-500/30">
              wr_clk: 100MHz | rd_clk: 33MHz (2-FF Sync)
            </span>
          )}
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400">
            DEPTH = {MAX_DEPTH} words
          </span>
        </div>
      </div>

      {/* Control Buttons & Indicators */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePush}
            disabled={isFull}
            className="flex items-center gap-1.5 rounded-lg border border-brand-cyan/40 bg-brand-cyan/15 px-3 py-2 text-brand-cyan hover:bg-brand-cyan/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ArrowDownRight className="h-4 w-4" />
            <span>PUSH (wr_en)</span>
          </button>

          <button
            onClick={handlePop}
            disabled={isEmpty}
            className="flex items-center gap-1.5 rounded-lg border border-brand-mint/40 bg-brand-mint/15 px-3 py-2 text-brand-mint hover:bg-brand-mint/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>POP (rd_en)</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>RESET (rst_n)</span>
          </button>
        </div>

        {/* Flag Badges */}
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-2.5 py-1 text-xs font-bold border transition-colors ${
              isEmpty
                ? "border-sky-500/40 bg-sky-500/20 text-sky-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-600"
            }`}
          >
            EMPTY {isEmpty ? "●" : "○"}
          </span>
          <span
            className={`rounded px-2.5 py-1 text-xs font-bold border transition-colors ${
              isFull
                ? "border-red-500/40 bg-red-500/20 text-red-400 animate-pulse"
                : "border-zinc-800 bg-zinc-900 text-zinc-600"
            }`}
          >
            FULL {isFull ? "●" : "○"}
          </span>
        </div>
      </div>

      {/* Memory Cells Visual Array */}
      <div className="my-5">
        <div className="mb-1 text-[11px] text-zinc-400">MEMORY ARRAY [DATA_WIDTH-1:0] mem [DEPTH-1:0]</div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {memory.map((val, idx) => {
            const isWrHere = wrPtr === idx;
            const isRdHere = rdPtr === idx;
            const hasData = val !== null;

            return (
              <div
                key={idx}
                className={`relative flex flex-col items-center justify-center rounded-xl p-2.5 border transition-all ${
                  hasData
                    ? "border-brand-cyan/40 bg-brand-cyan/10 shadow-[0_0_12px_rgba(174,217,224,0.15)]"
                    : "border-zinc-800/80 bg-zinc-900/40 text-zinc-600"
                }`}
              >
                {/* Pointer tags */}
                <div className="absolute -top-2 flex gap-1 text-[9px] font-bold">
                  {isWrHere && (
                    <span className="rounded bg-brand-cyan px-1 text-zinc-950 shadow">
                      WR[{idx}]
                    </span>
                  )}
                  {isRdHere && (
                    <span className="rounded bg-brand-mint px-1 text-zinc-950 shadow">
                      RD[{idx}]
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-zinc-500 mb-1">addr 0x{idx.toString(16)}</span>
                <span className={`font-bold text-sm ${hasData ? "text-zinc-100" : "text-zinc-600"}`}>
                  {val || "--"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Register Pointers & Output Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Write Pointer (wr_ptr)</div>
          <div className="font-bold text-brand-cyan text-sm">
            {wrPtr} <span className="text-[10px] text-zinc-400">(3&apos;b{wrPtr.toString(2).padStart(3, "0")})</span>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Read Pointer (rd_ptr)</div>
          <div className="font-bold text-brand-mint text-sm">
            {rdPtr} <span className="text-[10px] text-zinc-400">(3&apos;b{rdPtr.toString(2).padStart(3, "0")})</span>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Queue Depth (fifo_cnt)</div>
          <div className="font-bold text-zinc-200 text-sm">
            {count} / {MAX_DEPTH}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Last Popped Data</div>
          <div className="font-bold text-amber-300 text-sm">{lastReadVal || "None"}</div>
        </div>
      </div>

      {/* RTL Simulation Console Output */}
      <div className="rounded-lg border border-zinc-800 bg-[#0c0d10] p-3 text-[11px] text-zinc-300 flex items-start gap-2">
        <span className="text-brand-cyan select-none">&gt;&gt;</span>
        <span className="font-mono break-all">{lastAction}</span>
      </div>
    </div>
  );
};
