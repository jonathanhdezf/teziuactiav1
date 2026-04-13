'use client';

import FadeIn from './FadeIn';
import AccordionDemands from './AccordionDemands';

export default function DemandsSection() {
  return (
    <section
      id="demandas"
      aria-labelledby="demandas-heading"
      className="px-5 md:px-10 lg:px-20 py-24 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-stretch">
        <FadeIn direction="right">
          <div className="sticky top-24">
            <div className="law-badge mb-5 bg-amber-500/10 text-amber-400 border-amber-500/20">Sección 02</div>
            <h2
              id="demandas-heading"
              className="text-3xl md:text-5xl font-black leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Lo Que{' '}
              <span className="text-amber-400">Pedimos</span>
            </h2>
            <p className="mt-6 lead">
              Cuatro reformas concretas, viables y fundamentadas en la ley. No pedimos privilegios. <strong>Exigimos igualdad de trato y condiciones proporcionales</strong> a nuestra realidad operativa.
            </p>

            <div className="mt-10 glass-card border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)] transition-all" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-badge w-10 h-10 bg-amber-500/10 border-amber-500/30">
                  <svg className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a6 6 0 100 12A6 6 0 0010 2zM10 4a4 4 0 100 8A4 4 0 0010 4z" clipRule="evenodd" />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2A6 6 0 1010 6a6 6 0 000 12z" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">Dato clave</span>
              </div>
              <p className="text-[15px] text-neutral-300 leading-relaxed font-medium">
                En ciudades como Guadalajara, CDMX y Monterrey ya existen <strong className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">reglamentos específicos para motocicletas</strong> y trabajadores de plataforma. Teziutlán puede y debe hacer lo mismo.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.2}>
          <AccordionDemands />
        </FadeIn>
      </div>
    </section>
  );
}
