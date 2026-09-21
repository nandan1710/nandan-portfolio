"use client";

import { useState } from "react";
import { Cpu, LockKeyhole, ArrowRight } from "lucide-react";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (username === "NANDAN" && password === "12345") {
      window.location.href = "/admin/dashboard";
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-cyan-400/20 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">

        <div className="mb-7 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.15)]">
            <Cpu className="h-8 w-8" />
          </div>
        </div>

        <div className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
            <LockKeyhole className="h-4 w-4" />
            Restricted Area
          </div>

          <h1 className="text-2xl font-bold">
            NANDAN CMS
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-zinc-400">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(103,232,249,0.15)]"
          >
            Login
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

        </form>

        <p className="mt-6 text-center text-[10px] font-mono uppercase tracking-wider text-zinc-600">
          NANDAN N N • Portfolio CMS
        </p>

      </div>
    </main>
  );
}
