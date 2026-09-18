"use client";

import React, { useState } from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* Interactive Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Hardware Node & Trace Background Canvas */}
      <BackgroundCanvas />

      {/* Floating Glassmorphic Sticky Header */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Sections Flow */}
      <div className="relative z-10">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <ResumeSection
          isModalOpenExternal={isResumeModalOpen}
          onCloseModalExternal={() => setIsResumeModalOpen(false)}
        />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
