import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Search, Menu, Zap, ArrowRight, 
  MessageCircle, Share2, Bookmark, 
  TrendingUp, Clock, ChevronRight 
} from 'lucide-react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Handle Navbar Blur on Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ["Bio-Tech", "Neuro-Link", "AI Ethos", "Space-X"];

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* 2026 Reading Progress Meter */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.75 bg-linear-to-r from-cyan-500 via-purple-500 to-emerald-500 z-100 origin-left"
        style={{ scaleX }}
      />

      

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto pt-44 px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Feed (8 Columns) */}
          <section className="lg:col-span-8 space-y-20">
            
            {/* Immersive Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group cursor-pointer"
            >
              <div className="overflow-hidden rounded-[2.5rem] aspect-16/10 border border-white/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Hero"
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#08080a] via-transparent to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-cyan-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full">New Era</span>
                    <span className="text-white/60 text-xs font-medium backdrop-blur-md bg-white/5 px-3 py-1 rounded-full border border-white/10">8 Min Read</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-4">
                    The Quantum Leap: <br/> How AI Rewrote Biology.
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Post Feed */}
            <div className="space-y-16">
              {[1, 2].map((i) => (
                <motion.article 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center group"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-square border border-white/10">
                    <img 
                      src={`https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=600&h=600`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div>
                    <div className="flex gap-2 mb-4">
                      {["Cybersec", "Future"].map(tag => (
                        <span key={tag} className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">#{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                      Decentralized Neural Networks and the Privacy Paradox
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Exploring the friction between collective intelligence and individual data sovereignty in the late 2020s...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-500 to-cyan-500" />
                        <span className="text-xs font-bold text-white/80">Dr. Aris Thorne</span>
                      </div>
                      <div className="flex gap-4 text-slate-500">
                        <Bookmark size={18} className="hover:text-white cursor-pointer" />
                        <Share2 size={18} className="hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* RIGHT: HUD Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Interactive Stats Panel */}
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold uppercase tracking-widest text-xs text-slate-500">Live Insights</h4>
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Active Readers', value: '1.2k', color: 'bg-cyan-500' },
                  { label: 'Neural Uplinks', value: '842', color: 'bg-purple-500' }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">{stat.label}</span>
                      <span className="font-mono text-white">{stat.value}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter: Floating Style */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-4xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#08080a] border border-white/10 rounded-4xl p-8">
                <h4 className="text-xl font-bold mb-2">Neural Newsletter</h4>
                <p className="text-sm text-slate-400 mb-6">Get the daily uplink of the most important tech shifts.</p>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="id@nexus.io"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                  <button className="absolute right-2 top-2 bg-white text-black p-1.5 rounded-lg">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Interactive Mobile Footer Trigger */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl md:hidden">
        <button className="p-3 bg-white/10 rounded-xl"><Menu size={20}/></button>
        <button className="p-3 bg-cyan-500 text-black rounded-xl font-bold flex items-center gap-2">
          Explore <ChevronRight size={16}/>
        </button>
      </div>
    </div>
  );
};

export default Home;