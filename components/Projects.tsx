"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "EcoScout (FYP)",
    category: "AI / Computer Vision",
    description: "AI-driven video analytics to detect vehicles littering and smoke emissions in real-time.",
    link: "https://github.com/Saqibb786/EcoScout",
  },
  {
    id: 2,
    title: "Multi-Class Emotion Recognition",
    category: "NLP / Deep Learning",
    description: "Multi-label NLP model using GRU & BERT to detect emotions like joy, anger, and fear from text.",
    link: "https://github.com/Saqibb786/Emotion-Recognition-from-textual-data",
  },
  {
    id: 3,
    title: "Heart & Diabetes Prediction",
    category: "Machine Learning",
    description: "Risk assessment system using KNN and Naive Bayes to predict heart and diabetes risk from medical data.",
    link: "https://github.com/Saqibb786/Heart_Diabetes_Prediction_FastApi",
  },
  {
    id: 4,
    title: "OCR Tool",
    category: "Python / FastAPI",
    description: "Fast and reliable optical character recognition API for image-to-text conversion.",
    link: "https://github.com/Saqibb786/OCR-Dashboard-in-Python",
  },
  {
    id: 5,
    title: "GameHub Clone",
    category: "React / TypeScript",
    description: "Responsive game discovery platform with a clean, component-driven UI.",
    link: "https://github.com/Saqibb786/GameHub",
  },
  {
    id: 6,
    title: "Vaultify",
    category: "Java / Backend",
    description: "Secure banking backend with robust transaction processing logic.",
    link: "https://github.com/Saqibb786/Vaultify",
  },
  {
    id: 7,
    title: "Aspen",
    category: "React Native / Mobile",
    description: "Interactive mobile application built with Expo for smooth user navigation.",
    link: "https://github.com/Saqibb786/Aspen",
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(6); // Default to desktop

  // Adjust limit based on screen size
  useEffect(() => {
    const handleResize = () => {
       if (window.innerWidth < 768) {
           setVisibleLimit(3);
       } else {
           setVisibleLimit(6);
       }
    };
    
    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, visibleLimit);

  return (
    <section id="projects" className="relative w-full py-32 px-4 md:px-12 bg-[#121212] text-white z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-16 tracking-tight text-neutral-200"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors duration-500 overflow-hidden cursor-pointer"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                {/* Glow Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-8">
                   <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest border border-white/20 px-2 py-1 rounded-full">{project.category}</span>
                   <ArrowUpRight className="text-neutral-500 group-hover:text-white transition-colors duration-300" />
                </div>
  
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-neutral-100 transition-colors">{project.title}</h3>
                <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
                  {project.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
        
        {/* Collapsible Button */}
        {projects.length > visibleLimit && (
            <div className="mt-12 text-center">
                 <button
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                  >
                      {showAll ? (
                          <>Show Less <ChevronUp className="w-4 h-4" /></>
                      ) : (
                          <>Show More ({projects.length - visibleLimit} hidden) <ChevronDown className="w-4 h-4" /></>
                      )}
                  </button>
            </div>
        )}

        <div className="mt-8 text-center">
             <a 
               href="https://github.com/Saqibb786?tab=repositories" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-all font-medium group"
             >
                View all Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </a>
        </div>
        

      </div>
    </section>
  );
}
