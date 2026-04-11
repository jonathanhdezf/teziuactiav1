'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/manifiesto/manifiesto1.png',
  '/assets/manifiesto/manifiesto2.png',
  '/assets/manifiesto/manifiesto3.png',
  '/assets/manifiesto/manifiesto4.png',
  '/assets/manifiesto/manifiesto5.png',
  '/assets/manifiesto/manifiesto7.png', // 6 is missing
  '/assets/manifiesto/manifiesto8.png',
  '/assets/manifiesto/manifiesto9.png',
  '/assets/manifiesto/manifiesto10.png',
  '/assets/manifiesto/manifiesto11.png',
  '/assets/manifiesto/manifiesto12.png',
];

export default function ManifestoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextStep, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto px-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] md:aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-neutral-900 group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={images[index]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="absolute inset-0 w-full h-full object-contain bg-black/40 p-4 md:p-8"
            alt={`Manifiesto página ${index + 1}`}
          />
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevStep}
            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-all hover:scale-110 active:scale-95 shadow-xl"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextStep}
            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-all hover:scale-110 active:scale-95 shadow-xl"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em]">
            Página <span className="text-orange-400">{index + 1}</span> / {images.length}
          </div>
          <button
            onClick={() => {
              const url = window.location.origin + '#manifiesto';
              if (navigator.share) {
                navigator.share({ title: 'Manifiesto Reforma Teziupark', url });
              } else {
                navigator.clipboard.writeText(url);
                alert('¡Enlace del manifiesto copiado!');
              }
            }}
            className="p-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
            aria-label="Compartir manifiesto"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnails/Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-10 bg-orange-500' : 'w-2 bg-white/10 hover:bg-white/30'
            }`}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
