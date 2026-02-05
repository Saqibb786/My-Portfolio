"use client";

import { motion } from "framer-motion";
import { Users, Star, ArrowRight } from "lucide-react";

export default function Leadership() {
  const activities = [
    {
      org: "IEEE Computer Society",
      role: "Director Graphics",
      desc: "Leading the design team for event branding, creating high-impact visuals, and managing digital assets for major society events.",
      year: "Present",
      color: "hover:text-blue-400"
    },
    {
      org: "ACM Management",
      role: "Executive Member",
      desc: "Organized technical workshops and student engagement activities, fostering a collaborative tech community on campus.",
      year: "Past",
      color: "hover:text-yellow-400"
    },
    {
      org: "Welfare Society",
      role: "Volunteer",
      desc: "Active volunteer for the Esaar-e-Ramadan program, managing food distribution and logistics for community support initiatives.",
      year: "Past",
      color: "hover:text-red-400"
    },
    {
      org: "Code Rush",
      role: "Participant",
      desc: "Competed in high-intensity university-level algorithmic challenges, honing problem-solving and optimization skills.",
      year: "Past",
      color: "hover:text-purple-400"
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 md:px-12 bg-[#121212] text-white z-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-10 border-b border-white/10 pb-6 flex items-baseline justify-between"
        >
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-200 flex items-center gap-4">
               Leadership & Activities
             </h2>
             <span className="hidden md:inline-block text-neutral-500 font-mono text-sm uppercase tracking-widest">
                Beyond the Code
             </span>
        </motion.div>

        <div className="flex flex-col">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-b border-white/5 py-8 transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12 pl-4 md:pl-8 border-l-2 border-transparent group-hover:border-white/50 transition-colors">
                  
                  {/* Left: Role & Org */}
                  <div className="flex-1">
                      <h3 className={`text-xl md:text-3xl font-bold text-neutral-200 transition-colors ${activity.color}`}>
                        {activity.role}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-base text-neutral-500 font-medium">
                         <span>{activity.org}</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                         <span className="font-mono text-xs uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded-full">
                            {activity.year}
                         </span>
                      </div>
                  </div>

                  {/* Right: Description */}
                  <div className="flex-1 max-w-xl group-hover:translate-x-2 transition-transform duration-500">
                      <p className="text-neutral-400 text-base leading-relaxed">
                        {activity.desc}
                      </p>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                      <ArrowRight className="w-6 h-6 text-neutral-500" />
                  </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
