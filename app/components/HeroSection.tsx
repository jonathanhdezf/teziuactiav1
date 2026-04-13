'use client';

import FadeIn from './FadeIn';
import Spotlight from './Spotlight';
import InfoModal from './InfoModal';
import VideoModal from './VideoModal';

const stats = [
  { value: '2020', label: 'Año del reglamento', sublabel: 'Sin actualización a la economía digital' },
  { value: '0', label: 'Cajones para motos vecinales', sublabel: 'En todo el centro de Teziutlán' },
  { value: '+15K', label: 'Repartidores afectados', sublabel: 'En la región de Teziutlán y alrededores' },
  { value: '35%', label: 'Menos espacio', sublabel: 'Ocupan vs. un auto convencional' },
];

export default function HeroSection() {
  return (
    <Spotlight className="hero-bg min-h-[100dvh] flex flex-col justify-center px-5 md:px-10 lg:px-20 py-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle w-1.5 h-1.5 opacity-40 z-0"
          style={{
            left: `${15 + i * 14}%`,
            bottom: `${10 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3.5 + i * 0.4}s`,
          }}
        />
      ))}

      {/* Top nav bar */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-10 py-5 z-20">
        <FadeIn direction="down" delay={0.1}>
          <div className="flex items-center gap-3">
            <div className="icon-badge w-9 h-9 border border-orange-500/30">
              <svg className="w-5 h-5 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-black tracking-[0.2em] text-orange-400 uppercase">Petición Ciudadana</p>
              <p className="text-[11px] text-neutral-500">H. Ayuntamiento · Teziutlán, Pue.</p>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="down" delay={0.2}>
          <a
            href="#firma"
            id="nav-cta"
            className="hidden md:flex btn-primary px-5 py-2.5 rounded-xl text-sm items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            Firma la Exigencia
          </a>
        </FadeIn>
      </header>

      {/* Hero content */}
      <div className="relative z-20 max-w-5xl mx-auto w-full">
        <FadeIn direction="up" delay={0.3}>
          <div className="flex flex-wrap items-center gap-4 mb-6 relative z-30">
            <div className="law-badge backdrop-blur-md bg-orange-500/10 border-orange-500/20 text-orange-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Exigencia formal · Reforma Reglamento Teziupark 2026
            </div>
            <InfoModal />
            <VideoModal />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <h1
            id="hero-heading"
            className="text-glow font-display"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#f5f5f5',
            }}
          >
            La Movilidad Cambió.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Las Reglas También<br />Deben Hacerlo.
            </span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.5}>
          <p className="mt-6 text-lg md:text-xl max-w-2xl">
            Exigimos políticas <strong>claras, justas e incluyentes</strong> para motociclistas y repartidores en Teziutlán. El H. Ayuntamiento debe actuar.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#firma"
              id="hero-cta"
              className="btn-primary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
              Firma la Exigencia Ciudadana
            </a>
            <a
              href="#problema"
              className="px-8 py-4 rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm text-base text-neutral-300 hover:border-orange-500/50 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:text-orange-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              Ver el problema
            </a>
          </div>
        </FadeIn>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/5 relative">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.value} direction="up" delay={0.7 + (idx * 0.1)}>
              <div className="glass-card hover:bg-white/[0.03] p-4 md:p-5 text-center transition-colors">
                <div className="text-2xl md:text-3xl font-black text-orange-400 mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-neutral-200 mt-1">{stat.label}</div>
                <div className="text-[10px] text-neutral-500 mt-1 leading-tight">{stat.sublabel}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Spotlight>
  );
}
