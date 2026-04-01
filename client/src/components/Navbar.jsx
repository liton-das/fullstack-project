import React, { useState, useEffect } from 'react';
import {  useScroll } from 'framer-motion';
import { 
  Zap
} from 'lucide-react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Navbar Blur on Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {/* Floating Glass Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
        isScrolled ? "top-4" : "top-8"
      }`}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform">
              <Zap size={22} className="fill-white text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter italic">NEXUS</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['Intelligence', 'Archive', 'Community'].map((item) => (
              <a key={item} href="#" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2 rounded-xl transition-all text-sm font-bold">
              Sign In
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-xl transition-all text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
