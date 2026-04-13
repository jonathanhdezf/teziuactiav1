'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulating a visitor count fetch + increment
    // In a real app, this would come from a database or analytics API
    const baseCount = 12450;
    const randomBoost = Math.floor(Math.random() * 50);
    setCount(baseCount + randomBoost);
    
    const timer = setTimeout(() => setIsVisible(true), 1500);
    
    // Simulate real-time updates every few seconds
    const interval = setInterval(() => {
      setCount(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-24 left-6 z-[60] hidden md:block"
        >
          <div className="relative group">
            {/* Soft Glow Background */}
            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center gap-3 px-4 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Ciudadanos Activos</span>
                <div className="flex items-baseline gap-1">
                  <motion.span 
                    key={count}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-black font-display text-white tabular-nums"
                  >
                    {count.toLocaleString()}
                  </motion.span>
                  <span className="text-[10px] font-bold text-orange-500/80 tracking-tighter cursor-default">+1 hoy</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap shadow-2xl">
                Monitoreo en tiempo real
              </div>
              <div className="w-2 h-2 bg-neutral-900 border-r border-b border-white/10 transform rotate-45 ml-4 -mt-1" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
