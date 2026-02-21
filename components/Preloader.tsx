"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 2000; // 2 seconds total loading animation
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Easing function for smoother progress (ease-out cubic)
      const t = step / steps;
      const easedProgress = Math.min(Math.round((1 - Math.pow(1 - t, 3)) * 100), 100);
      
      setProgress(easedProgress);

      if (step >= steps) {
        clearInterval(timer);
        setIsAnimatingOut(true);
        // Wait for exit animation to finish before unmounting
        setTimeout(() => {
            document.body.style.overflow = "auto";
            onComplete();
        }, 800);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isAnimatingOut && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Animated Background Gradients for subtle depth */}
          <div className="absolute inset-0 overflow-hidden">
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
                    {progress}
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
                   className="h-full bg-white"
                   style={{ width: `${progress}%` }}
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

          {/* Slices for exit animation (Optional, currently using fade) */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
