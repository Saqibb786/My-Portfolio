"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics config - "Snappy" feel
  const springConfig = { damping: 25, stiffness: 400 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Secondary spring for the ring (slightly smoother/slower for "magnetic" lag)
  const ringConfig = { damping: 30, stiffness: 200 };
  const ringX = useSpring(mouseX, ringConfig);
  const ringY = useSpring(mouseY, ringConfig);

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    // Optional: Add hover detection for links/buttons to scale the cursor
    // This adds that "interactive" feel
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. The Core Dot - Fast & Sharp */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-white rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 8 : 8, // Keep dot consistent or scale slightly
          height: hovering ? 8 : 8,
        }}
      />
      
      {/* 2. The Magnetic Ring - Follows lazily */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border border-white rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 24, // Scale up on hover
          height: hovering ? 40 : 24,
          opacity: hovering ? 0.8 : 0.5,
          borderWidth: hovering ? 2 : 1.5,
        }}
      />
    </>
  );
}
