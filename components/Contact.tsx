"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MessageCircle, Send, Loader2 } from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    emailjs
      .sendForm(
        "service_1jej70h", // Service ID from user HTML
        "template_3sb1aqd", // Template ID from user HTML
        formRef.current,
        {
          publicKey: "DXakTcxNmT58IYOC1", // Public Key from user HTML
        }
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          formRef.current?.reset();
          // Reset status after 5s
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setLoading(false);
          setStatus("error");
        }
      );
  };

  return (
    <section id="contact" className="relative w-full py-24 px-4 md:px-12 bg-[#121212] border-t border-white/10 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info Column */}
        <div className="flex flex-col justify-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8">
                  Let's Connect
                </h2>
                <p className="text-neutral-400 max-w-lg mb-12 text-lg leading-relaxed">
                    I’m always open to discussing new projects, creative ideas, or opportunities 
                    to be part of your visions.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >
                 <a href="mailto:saqibbutt10000@gmail.com" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">saqibbutt10000@gmail.com</span>
                </a>
                <a href="tel:+923244342068" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
                     <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-lg">+92 324 4342068</span>
                </a>
                <a href="https://wa.me/qr/XEFTOBUHK4NQD1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
                     <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Chat on WhatsApp</span>
                </a>
            </motion.div>
        </div>

        {/* Contact Form Column */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10"
        >
             <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
                        <input 
                            type="text" 
                            name="from_name" 
                            id="name" 
                            required 
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
                        <input 
                            type="email" 
                            name="reply_to" 
                            id="email" 
                            required 
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-neutral-400">Subject</label>
                    <input 
                        type="text" 
                        name="subject" 
                        id="subject" 
                        required 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Project Inquiry"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message</label>
                    <textarea 
                        name="message_html" 
                        id="message" 
                        rows={4} 
                        required 
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all placeholder:text-neutral-600"
                        placeholder="Tell me about your project..."
                    />
                </div>
                
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                           <Send className="w-5 h-5" /> Send Message
                        </>
                    )}
                </button>

                {status === "success" && (
                    <p className="text-green-400 text-center text-sm bg-green-400/10 py-2 rounded">
                        Message sent successfully! I'll get back to you soon.
                    </p>
                )}
                {status === "error" && (
                    <p className="text-red-400 text-center text-sm bg-red-400/10 py-2 rounded">
                        Something went wrong. Please try again or email directly.
                    </p>
                )}
             </form>
        </motion.div>

      </div>
    </section>
  );
}
