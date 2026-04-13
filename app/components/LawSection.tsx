'use client';

import FadeIn from './FadeIn';
import LawTicker from './LawTicker';

export default function LawSection() {
  return (
    <section
      id="ley"
      aria-labelledby="ley-heading"
      className="relative overflow-hidden bg-black/40"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 6rem)', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent blur-3xl pointer-events-none" />

      <FadeIn direction="up">
        <div className="max-w-7xl mx-auto px-5 md:px-10 mb-12 text-center relative z-10">
          <div className="law-badge mb-4 mx-auto w-fit">Sección 03 · Marco Legal</div>
          <h2
            id="ley-heading"
            className="text-3xl md:text-5xl font-black"
            style={{ letterSpacing: '-0.02em' }}
          >
            La{' '}
            <span className="text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">Ley Nos Respalda</span>
          </h2>
          <p className="text-neutral-500 mt-4 text-base">
            Pasa el cursor o desliza para pausar.
          </p>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-[var(--bg-base)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-[var(--bg-base)] to-transparent pointer-events-none" />

        <div className="border-y border-orange-500/20 bg-orange-500/5 py-6 shadow-[inset_0_0_30px_rgba(249,115,22,0.05)]">
          <LawTicker />
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 mt-12 flex flex-wrap justify-center gap-4">
          {[
            'Constitución Política de los EUM',
            'Ley de Movilidad de Puebla',
            'Ley Federal del Trabajo',
            'Ley de Protección al Consumidor',
            'Reglamento de Tránsito Estatal',
          ].map(law => (
            <span key={law} className="law-badge hover:bg-orange-500/20 transition-colors cursor-default border-orange-500/40 text-orange-400">⚖ {law}</span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
