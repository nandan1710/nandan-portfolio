"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target?.closest("button, a, input, textarea, [role='button'], .interactive");
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-cyan/40 bg-brand-cyan/5 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(184, 242, 230, 0.8)" : "rgba(174, 217, 224, 0.35)",
          backgroundColor: isHovered ? "rgba(174, 217, 224, 0.12)" : "rgba(174, 217, 224, 0.03)",
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 350,
          mass: 0.4,
        }}
        style={{
          width: 36,
          height: 36,
        }}
      />
      {/* Inner pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-brand-cyan pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#aed9e0]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 800,
          mass: 0.1,
        }}
        style={{
          width: 6,
          height: 6,
        }}
      />
    </div>
  );
};
