"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OVERLAY_SETTINGS = {
  // ==================================================================================
  // 🔧 TEXT PLACEMENT SETTINGS
  // Adjust these values to move the text up/down.
  // ==================================================================================
  
  // MOBILE: Distance from the bottom of the screen
  // options: "bottom-20", "bottom-32", "bottom-40", "bottom-1/3"
  // CHANGED to top-based positioning to prevent jumpiness when address bar resizes
  mobilePosition: "top-[75%]", 

  // DESKTOP: Distance from the TOP of the screen
  // options: "md:top-[50%]", "md:top-[60%]", "md:top-[70%]"
  desktopPosition: "md:top-[60%]",

  // TITLE (Name & Subtitle) Position Settings
  // Increase these values to move the title downwards
  titleMobilePadding: "pt-[36vh]", // +10% from original 20vh
  titleDesktopPadding: "md:pt-[25vh]", // +5% from original 20vh
};

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
    // ... (logic helper comments removed for brevity) ...

  // Opacity and Translate Maps
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);

  // Combine positioning classes
  const positionClasses = `absolute ${OVERLAY_SETTINGS.mobilePosition} ${OVERLAY_SETTINGS.desktopPosition}`;
  const titleClasses = `absolute inset-0 flex flex-col items-center justify-center text-center p-4 ${OVERLAY_SETTINGS.titleMobilePadding} ${OVERLAY_SETTINGS.titleDesktopPadding}`;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center w-full h-full mix-blend-difference text-white">
      {/* Section 1: Center (0%) */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className={titleClasses}
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-4">Saqib Ali Butt</h1>
        <p className="text-lg md:text-xl font-light uppercase tracking-widest text-neutral-400">AI Engineering | Machine Learning | Data Science | NLP | Full-Stack</p>
      </motion.div>

      {/* Section 2: Left (~30%) */}
      <motion.div 
        style={{ opacity: opacity2 }}
        className={`${positionClasses} -translate-y-1/2 left-4 md:left-24 max-w-2xl`}
      >
        <h2 className="text-3xl md:text-6xl font-semibold leading-tight">
          Developing intelligent <br />
          systems that see, <br />
          <span className="text-neutral-300">understand, & predict.</span>
        </h2>
      </motion.div>

      {/* Section 3: Right (~60%) */}
      <motion.div 
        style={{ opacity: opacity3 }}
        className={`${positionClasses} -translate-y-1/2 right-4 md:right-24 text-right max-w-2xl`}
      >
        <h2 className="text-3xl md:text-6xl font-semibold leading-tight">
          Transforming <br />
          <span className="text-neutral-300">raw data</span> into <br />
          impactful solutions.
        </h2>
      </motion.div>
    </div>
  );
}
