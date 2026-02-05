"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0a0a0a] border-t border-white/10 text-white z-30 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          
          {/* About Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
               {/* Replaced Image Logo with Text for reliability if asset missing */}
               <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Saqib</span> Ali Butt
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Aspiring Software Engineer <br />
              passionate about building intelligent solutions and solving
              real-world problems through technology.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skills</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Saqibb786"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-neutral-400 transition-all border border-white/5"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/saqib-ali-butt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-neutral-400 transition-all border border-white/5"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/qr/XEFTOBUHK4NQD1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-neutral-400 transition-all border border-white/5"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="mailto:saqibbutt10000@gmail.com" 
                aria-label="Email"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-neutral-400 transition-all border border-white/5"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-neutral-500 font-mono">
                saqibbutt10000@gmail.com
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-neutral-600 text-xs uppercase tracking-widest">
           &copy; {currentYear} Saqib Ali Butt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
