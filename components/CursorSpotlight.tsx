"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const [hovering, setHovering] = useState(false);

  // Helper to create a following spring
  // stronger stiffness = closer follow, higher damping = less waffle
  const useFollower = (index: number) => {
    // Slower physics: Reduce starting stiffness
    // Wider spread: Increase the gap between trail items
    // Index 0 is the closest trail, Index 11 is the furthest
    const stiffness = hovering ? 500 : 200 - (index * 15); // ranges from 200 down to ~35
    const damping = hovering ? 30 : 20 - (index * 1); // ranges from 20 down to ~9
    
    return {
      x: useSpring(mouseX, { stiffness, damping }),
      y: useSpring(mouseY, { stiffness, damping }),
    };
  };

  // Generate 12 trail particles
  // We use a fixed array to ensure hook consistency
  const trailCount = 12;
  const trails = Array.from({ length: trailCount }).map((_, i) => useFollower(i));

  // Mouse Listeners
  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          window.getComputedStyle(target).cursor === 'pointer';
      setHovering(!!isInteractive);
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
      {/* TRAIL PARTICLES (Rendered first to be behind) */}
      {trails.map((trail, index) => (
        <motion.div
            key={index}
            className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference bg-white rounded-full"
            style={{
                x: trail.x,
                y: trail.y,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                width: hovering ? 54 : 16 - (index * 0.8), // Gradual size reduction
                height: hovering ? 54 : 16 - (index * 0.8),
                opacity: hovering ? 0 : 0.8 - (index * 0.05), // Fade out tail
            }}
            transition={{ duration: 0.2 }}
        />
      ))}

      {/* HEAD CURSOR */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white rounded-full"
        style={{
          x: useSpring(mouseX, { stiffness: 500, damping: 30 }),
          y: useSpring(mouseY, { stiffness: 500, damping: 30 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
            width: hovering ? 54 : 12, // 10% reduced size on hover (60->54)
            height: hovering ? 54 : 12,
            opacity: 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
