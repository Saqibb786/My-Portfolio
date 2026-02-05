"use client";

import { motion } from "framer-motion";

const skills = [
  { category: "AI / ML", items: ["Python", "Machine Learning", "Deep Learning", "NLP", "Transformers", "Feature Engineering"] },
  { category: "Data Science", items: ["Pandas", "NumPy", "Scikit-learn", "Data Visualization"] },
  { category: "Full Stack", items: ["React", "Next.js", "Node.js", "TypeScript", "FastAPI", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Docker", "Linux", "VS Code"] },
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-32 px-4 md:px-12 bg-[#121212] text-white z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Bio Section */}
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-neutral-200"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert text-neutral-400 text-lg leading-relaxed max-w-xl"
          >
            <p className="mb-6">
                I'm a final-year Computer Science student at the University of Central Punjab, Lahore.
              My journey lies at the intersection of <span className="text-white font-medium">Software engineering</span> and <span className="text-white font-medium">Artificial intelligence</span>.
              I've completed the IBM Data Science Professional Certificate and multiple courses from Google/DeepLearning.AI/FreeCodeCamp.
            </p>
            <p>
              I enjoy turning complex problems into working products—whether that means training models to extract meaning from data 
              or engineering full-stack applications that scale. With a growing interest in Generative AI and applied data science, 
              I aim to build technology that is both technically sound and genuinely useful.
            </p>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="flex-1">
           <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 text-neutral-200"
            >
              Technical Arsenal
            </motion.h3>
            
            <div className="space-y-8">
              {skills.map((skillGroup, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2 inline-block">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/10 hover:border-white/30 transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
}
