"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Education() {
  const education = [
    {
      title: "Bachelors in Computer Science",
      institution: "University of Central Punjab",
      year: "Expected 2026",
      details: "CGPA: 3.23 | 7th Semester",
    },
    {
      title: "Intermediate in Computer Science",
      institution: "Punjab Group of Colleges",
      year: "2022",
      details: "Focus on Computer Science fundamentals",
    },
  ];

  const certifications = [
    { name: "IBM Data Science Professional Certificate", issuer: "IBM (Coursera)", date: "Jan 2025" },
    { name: "Machine Learning with Scikit-learn, PyTorch & Hugging Face", issuer: "DeepLearning.AI & Stanford", date: "Ongoing" },
    { name: "Introduction to Generative AI", issuer: "Google Cloud", date: "2025" },
    { name: "Introduction to Large Language Models", issuer: "Google Cloud", date: "2025" },
    { name: "AI For Everyone", issuer: "DeepLearning.AI", date: "2024" },
    { name: "Google Prompting Essentials", issuer: "Google", date: "2025" },
    { name: "Complete Python Mastery", issuer: "Code with Mosh", date: "2024" },
    { name: "HTML5/CSS3/Javascript", issuer: "Code with Mosh", date: "2023" },
    { name: "React Native", issuer: "ACM Society (UCP)", date: "2024" },
    { name: "Graphic Designing", issuer: "ACM Society (UCP)", date: "2025" },
  ];

  const [customShowAll, setCustomShowAll] = useState(false);
  const initialLoadCount = 4;
  const displayedCertifications = customShowAll ? certifications : certifications.slice(0, initialLoadCount);

  return (
    <section id="education" className="relative w-full py-32 px-4 md:px-12 bg-[#121212] text-white z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Education Column */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 tracking-tight text-neutral-200 flex items-center gap-4"
          >
            <GraduationCap className="text-neutral-500" /> Education
          </motion.h2>
          
          <div className="space-y-12 border-l border-white/10 pl-8 ml-3">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#121212] border-2 border-white/20" />
                <h3 className="text-xl font-semibold text-white">{edu.title}</h3>
                <p className="text-neutral-400 mt-1">{edu.institution}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500 font-mono">
                  <span>{edu.year}</span>
                  <span>•</span>
                  <span>{edu.details}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div>
           <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 tracking-tight text-neutral-200 flex items-center gap-4"
          >
            <Award className="text-neutral-500" /> Certifications
          </motion.h2>

          <div className="grid grid-cols-1 gap-4">
             {displayedCertifications.map((cert, index) => (
                <motion.a
                  key={index}
                  href="https://www.linkedin.com/in/saqib-ali-butt/details/certifications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-neutral-200 font-medium group-hover:text-white transition-colors">{cert.name}</h4>
                        <p className="text-sm text-neutral-500 mt-1">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono text-neutral-600 border border-white/10 px-2 py-1 rounded">{cert.date}</span>
                  </div>
                </motion.a>
             ))}
          </div>
          
          {/* Collapsible Button */}
          {certifications.length > initialLoadCount && (
              <motion.button
                onClick={() => setCustomShowAll(!customShowAll)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm font-medium text-neutral-400 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
              >
                  {customShowAll ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                      <>Show More ({certifications.length - initialLoadCount} hidden) <ChevronDown className="w-4 h-4" /></>
                  )}
              </motion.button>
          )}

          {/* View All on LinkedIn Button */}
          <div className="mt-6 text-center">
             <a 
               href="https://www.linkedin.com/in/saqib-ali-butt/details/certifications/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
             >
                View all Certifications <Award className="w-4 h-4" />
             </a>
          </div>

        </div>

      </div>
    </section>
  );
}
