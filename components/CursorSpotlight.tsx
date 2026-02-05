"use client";

import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics: Smooth but responsive
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity for squash & stretch
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const [hovering, setHovering] = useState(false);
  const [velocityRotation, setVelocityRotation] = useState(0);
  const [stretchScale, setStretchScale] = useState({ x: 1, y: 1 });

  // Update transforms based on velocity (60fps loop)
  useEffect(() => {
    const updatePhysics = () => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      const speed = Math.sqrt(vx * vx + vy * vy);
      
      // Calculate rotation based on movement direction
      // Only update if moving fast enough to avoid jitter
      if (speed > 5) {
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        setVelocityRotation(angle);
      }

      // Calculate Elastic Stretch (Squash & Stretch)
      // Max stretch factor of 0.5 (1.5x length) at high speeds
      const constant = Math.min(speed / 1000, 0.5);
      
      if (speed > 10 && !hovering) {
        setStretchScale({ x: 1 + constant, y: 1 - constant * 0.4 });
      } else {
        setStretchScale({ x: 1, y: 1 }); // Reset when stopped or hovering
      }
    };

    const interval = setInterval(updatePhysics, 16);
    return () => clearInterval(interval);
  }, [velocityX, velocityY, hovering]);

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
        {/* The "Architect" Cursor: Single Element */}
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
                // Physics Transforms
                rotate: hovering ? 0 : velocityRotation, 
                scaleX: hovering ? 1 : stretchScale.x, 
                scaleY: hovering ? 1 : stretchScale.y,
            }}
            animate={{
                // IDLE: Hollow Diamond (12px, 45deg, transparent bg, white border)
                // HOVER: Solid Circle (54px, 0deg, white bg, no border) - Reduced 10% from 60
                width: hovering ? 54 : 12,
                height: hovering ? 54 : 12,
                borderRadius: hovering ? "50%" : "0%", // Circle vs Square
                rotate: hovering ? 0 : 45, // Rotate diamond 45deg
                backgroundColor: hovering ? "#ffffff" : "rgba(255,255,255,0)", // Solid vs Transparent
                borderWidth: hovering ? 0 : 2, // No border vs Border
                borderColor: "#ffffff"
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                // layout: { duration: 0.3 }
            }}
        >
             {/* Optional: Tiny center dot for precision during idle? 
                 No, let's keep it strictly single element as requested "instead of dot AND bounding"
             */}
        </motion.div>
    </>
  );
}
