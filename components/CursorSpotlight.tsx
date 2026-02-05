"use client";

import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 1. Smooth Spring Physics for the Follower
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. Velocity Calculation (How fast are we moving?)
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  // 3. Transformation Math (Squash & Stretch)
  const scale = useTransform(speed => {
    // Map speed (0-1000px/s) to scale (1 -> 1.5)
    // We limit it so it doesn't get too thin
    const s = Math.min(speed / 500, 0.5); 
    return 1 + s;
  }, [velocityX, velocityY]); // This needs to combine both... actually useVelocity returns individual.

  // We need to combine velocities to get magnitude and angle
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    // We'll use a manual loop to update rotation/scale based on current velocity values
    // simple interval or requestAnimationFrame handling via React state is safer for transforms
    const updateTransforms = () => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Stretch based on speed (max stretch 2.5x at varying speeds)
      const stretch = Math.min(speed / 1000, 0.5); 
      
      // If moving, update rotation to face direction
      if (speed > 10) {
        setRotate(angle);
        setScaleX(1 + stretch); // Elongate along X
        setScaleY(1 - stretch * 0.5); // Squash along Y
      } else {
        setScaleX(1);
        setScaleY(1);
      }
    };

    const interval = setInterval(updateTransforms, 16); // 60fps check
    return () => clearInterval(interval);
  }, [velocityX, velocityY]);

  // Hover State
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      // Offset by scroll if needed, but for fixed cursor clientX is fine
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
        // Check if target is interactive
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
      {/* 1. Main Dot (Always precise) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-white rounded-full mix-blend-difference"
        style={{
          x: mouseX, // Hard tracking
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 40 : 8, 
          height: hovering ? 40 : 8,
          opacity: 1,
          transition: "width 0.2s, height 0.2s" // CSS transition for hover state
        }}
      />
      
      {/* 2. Elastic Ring (Follows & Deforms) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border border-white rounded-full mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 40, 
          height: 40,
          rotate: rotate, // Rotate to follow velocity
          scaleX: hovering ? 1.5 : scaleX, // Override elastic stretch on hover
          scaleY: hovering ? 1.5 : scaleY,
          opacity: hovering ? 0 : 0.6, // Hide ring on hover (merge with dot), show otherwise
          borderWidth: 1.5,
        }}
        transition={{
            scaleX: { type: "spring", stiffness: 300, damping: 20 },
            scaleY: { type: "spring", stiffness: 300, damping: 20 }
        }}
      />
    </>
  );
}
