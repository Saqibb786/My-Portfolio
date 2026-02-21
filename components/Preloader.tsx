"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const count = useMotionValue(0);
  // Transform the raw spring/tween float into a rounded integer string
  const rounded = useTransform(count, (latest) => Math.round(latest));
  // Transform count to scale 0-1 for the progress bar
  const progressScaleX = useTransform(count, [0, 100], [0, 1]);

  useEffect(() => {
    // Prevent scrolling and body interaction during load
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    // Play count animation over 2 seconds
    const controls = animate(count, 100, {
      duration: 2,
      ease: "easeOut",
      onComplete: () => {
        // Trigger the exit animation
        setIsAnimatingOut(true);
        // Clean up and notify parent after exit fade completes
        setTimeout(() => {
            document.body.style.overflow = "";
            document.body.style.pointerEvents = "";
            onComplete();
        }, 800); // matches the transition duration 0.8s
      }
    });

    return () => {
      controls.stop();
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      {!isAnimatingOut && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Animated Background Gradients for subtle depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <motion.div 
               animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1] 
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"
             />
          </div>

          <div className="relative z-10 flex flex-col items-center">
             {/* Main Counter */}
             <div className="overflow-hidden py-4 flex items-end justify-center">
                <motion.span 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-white tabular-nums leading-none"
                >
                    {rounded}
                </motion.span>
                <motion.span 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.5 }}
                     className="text-2xl md:text-4xl text-neutral-500 mb-2 md:mb-4 ml-1"
                >
                    %
                </motion.span>
             </div>

             {/* Minimal Progress Bar */}
             <div className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-white origin-left"
                   style={{ 
                      scaleX: progressScaleX 
                   }}
                />
             </div>

             {/* Branding text */}
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500"
             >
                Initializing Experience
             </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
