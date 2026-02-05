"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
    // This overlay sits "inside" the same scroll context or logic. 
    // Since the ScrollyCanvas HAS the standard flow with 500vh height, 
    // we can position this Overlay absolute on top of it, 
    // OR we can rely on global window scroll if we want.
    // However, ScrollyCanvas is the scroll container logic. 
    // Actually, overlay is usually FIXED or STICKY on top.
    
    // Better approach: Overlay is a sibling to Canvas inside the sticky container.
    // BUT the task says: "Overlay content must sit above canvas".
    // And "Parallax speed slightly different".
    
    // We will use the main window scroll. ScrollyCanvas makes the page 500vh tall.
    // We can just use `fix` positioning and map things to window scroll.

  // Opacity and Translate Maps
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.15, 0.4], [50, 0]); // Slide in from right? or Left: "30% scroll (left aligned)" - implies static placement? 
  // Let's do subtle parallax.
  
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center w-full h-full mix-blend-difference text-white">
      {/* Section 1: Center (0%) */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pt-[20vh]"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-4">Saqib Ali Butt</h1>
        <p className="text-lg md:text-xl font-light uppercase tracking-widest text-neutral-400">AI Engineering | Machine Learning | Data Science | NLP | Full-Stack</p>
      </motion.div>

      {/* Section 2: Left (~30%) */}
      <motion.div 
        style={{ opacity: opacity2 }}
        className="absolute top-1/2 -translate-y-1/2 left-4 md:left-24 max-w-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
          I build <span className="text-neutral-300">cinematic</span> <br />
          digital experiences.
        </h2>
      </motion.div>

      {/* Section 3: Right (~60%) */}
      <motion.div 
        style={{ opacity: opacity3 }}
        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-24 text-right max-w-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
          Bridging design, <br />
          engineering, and <br />
          <span className="text-neutral-300">intelligence.</span>
        </h2>
      </motion.div>
    </div>
  );
}
