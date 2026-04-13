'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card overflow-hidden flex flex-col md:flex-row gap-8 p-6 md:p-8 items-center bg-black/40 border-white/5 shadow-2xl">
        {/* Cover Art */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 group">
          <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Image
            src="/assets/podcast_cover.png"
            alt="Podcast Cover"
            width={224}
            height={224}
            className={`w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 transition-transform duration-700 ${isPlaying ? 'scale-105 rotate-1' : 'scale-100'}`}
          />
          {/* Play/Pause Overlay for Mobile */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl md:hidden"
          >
            {isPlaying ? (
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">Podcast Especial</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white font-display leading-tight">
              Repartidores de Teziutlán contra Teziupark
            </h3>
            <p className="text-neutral-400 text-sm font-medium">Testimonios reales sobre el impacto del reglamento actual.</p>
          </div>

          <div className="space-y-4">
            {/* Waveform Visualization (Simulated with div bars) */}
            <div className="flex items-end gap-[3px] h-12 px-2">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [10, 30, 15, 40, 20][i % 5] : 10,
                    backgroundColor: i / 40 < currentTime / duration ? '#f97316' : '#404040'
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (i % 3) * 0.2,
                    ease: "easeInOut"
                  }}
                  className="flex-1 rounded-t-full transition-colors duration-300"
                  style={{ minWidth: '4px' }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400"
                aria-label="Progreso del audio"
              />
              <div className="flex justify-between text-[10px] font-black font-mono text-neutral-500 uppercase tracking-widest">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>

              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Escuchar ahora</span>
                <span className="text-neutral-500 text-xs text-nowrap">Audio original · 24 min aprox.</span>
              </div>

              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    const url = window.location.origin + '#podcast';
                    if (navigator.share) {
                      navigator.share({ 
                        title: 'Podcast: Repartidores vs Teziupark',
                        text: 'Escucha el testimonio de los repartidores de Teziutlán.',
                        url 
                      });
                    } else {
                      navigator.clipboard.writeText(url);
                      alert('¡Enlace del podcast copiado!');
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
                >
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="/assets/Repartidores_de_Teziutlán_contra_Teziupark.m4a"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
}
