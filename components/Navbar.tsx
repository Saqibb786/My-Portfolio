"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Education", to: "education" },
    { name: "Leadership", to: "leadership" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          SAQIB<span className="text-neutral-500">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.to}`}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/Saqibb786"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#121212] border-b border-white/10"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.to}`}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
