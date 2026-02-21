"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="relative w-full bg-[#121212]">
      {/* Hide overflow until loader finishes to prevent early scrolling */}
      <div style={{ visibility: loadingComplete ? "visible" : "hidden", height: loadingComplete ? "auto" : "100vh", overflow: loadingComplete ? "visible" : "hidden" }}>
        <Navbar />
        {/* 500vh Scroll Container */}
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Sticky Wrapper for Canvas + Overlay */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <ScrollyCanvas scrollYProgress={scrollYProgress} />
              <Overlay scrollYProgress={scrollYProgress} />
            </div>
        </div>
        
        {/* Content Sections */}
        <div className="relative z-10 bg-[#121212]">
          <About />
          <Projects />
          <Education />
          <Leadership />
          <Contact />
          <Footer />
        </div>
        <ScrollToTop />
      </div>

      {/* Render Preloader on top */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}
    </main>
  );
}
