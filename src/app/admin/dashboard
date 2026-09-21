"use client";

import {
  LayoutDashboard,
  Home,
  FolderKanban,
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  FileText,
  Image,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Homepage", icon: Home },
  { name: "Projects", icon: FolderKanban },
  { name: "About", icon: User },
  { name: "Technical Capabilities", icon: Wrench },
  { name: "Experience", icon: Briefcase },
  { name: "Education", icon: GraduationCap },
  { name: "Technical Development", icon: Code2 },
  { name: "Contact", icon: Mail },
  { name: "Resume", icon: FileText },
  { name: "Media", icon: Image },
];

export default function AdminDashboard() {
  const handleLogout = () => {
    window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <header className="border-b border-zinc-800 bg-zinc-900/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div>
            <h1 className="text-xl font-bold">
              NANDAN CMS
            </h1>

            <p className="text-xs font-mono text-zinc-500">
              Portfolio Content Management System
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-400/40 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">

        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-zinc-800 p-4 md:block">

          <nav className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              );
            })}

          </nav>

        </aside>

        <section className="flex-1 p-6 md:p-10">

          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">
              Admin Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Welcome, NANDAN
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage your portfolio content from one place.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {menuItems.slice(1).map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition-all hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-zinc-900"
                >
                  <Icon className="h-6 w-6 text-cyan-300 transition-transform group-hover:scale-110" />

                  <h3 className="mt-5 font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Manage {item.name.toLowerCase()} content.
                  </p>
                </button>
              );
            })}

          </div>

        </section>

      </div>
    </main>
  );
}
