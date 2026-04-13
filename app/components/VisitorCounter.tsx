'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animate counter increment
  useEffect(() => {
    if (displayCount < count) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count, displayCount]);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const res = await fetch('/api/visits', {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        const data = await res.json();
        if (data.count) {
          setCount(data.count);
        }
      } catch {
        // Silently fail, show 0
        console.warn('Failed to fetch visit count');
      }
    };

    fetchVisitCount();

    const timer = setTimeout(() => setIsVisible(true), 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 30,
            duration: 0.6 
          }}
          // Mobile: top-right | Desktop: bottom-left
          className="fixed z-[60] top-4 right-4 md:top-auto md:right-auto md:bottom-24 md:left-6"
        >
          {/* Animated Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 via-amber-400/20 to-orange-500/30 rounded-2xl blur-md opacity-60 group-hover:opacity-100 animate-pulse" />

          {/* Main Card */}
          <div className="relative group">
            {/* Gradient Border Effect */}
            <div className="absolute -inset-[0.5px] bg-gradient-to-r from-orange-500/60 via-amber-400/40 to-orange-500/60 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-neutral-900/95 via-black/95 to-neutral-900/95 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(249,115,22,0.2)] overflow-hidden">
              {/* Shimmer Background Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out" />
              </div>

              {/* Content Container */}
              <div className="relative px-4 py-3 md:px-5 md:py-4 flex items-center gap-3">
                {/* Animated Icon */}
                <div className="relative flex-shrink-0">
                  {/* Outer Pulse Ring */}
                  <motion.div
                    className="absolute -inset-1 bg-orange-500/30 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  />
                  
                  {/* Icon Container */}
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center backdrop-blur-sm">
                    {/* People Icon */}
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 mb-0.5">
                    Visitantes
                  </span>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={displayCount}
                      className="text-xl md:text-2xl font-black font-display bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(249,115,22,0.4)] tabular-nums"
                    >
                      {displayCount.toLocaleString()}
                    </motion.span>
                    
                    {/* Live Badge */}
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
                      </span>
                      <span className="text-[7px] md:text-[8px] font-bold text-green-400 uppercase tracking-wider">Live</span>
                    </span>
                  </div>
                </div>

                {/* Arrow Icon (desktop only) */}
                <div className="hidden md:flex flex-shrink-0 text-neutral-600 group-hover:text-orange-400 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Bottom Glow Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            </div>

            {/* Tooltip on Hover (desktop only) */}
            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="px-3 py-2 bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-bold text-neutral-300 whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <span className="text-orange-400">⚡</span> Visitas globales en tiempo real
              </div>
              <div className="w-2 h-2 bg-neutral-900 border-r border-b border-white/10 transform rotate-45 mx-auto -mt-1" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
