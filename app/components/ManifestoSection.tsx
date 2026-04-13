'use client';

import FadeIn from './FadeIn';
import ManifestoCarousel from './ManifestoCarousel';

export default function ManifestoSection() {
  return (
    <section
      id="manifiesto"
      className="px-5 md:px-10 py-24 relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <FadeIn direction="up">
        <div className="text-center mb-16 relative z-10">
          <div className="law-badge mb-5 mx-auto w-fit">Sección 03 · Nuestra Visión</div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight font-display">
            Nuestro <span className="text-orange-400">Manifiesto</span>
          </h2>
          <p className="mt-6 text-neutral-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Una declaración colectiva por la dignidad, el respeto y la modernización de la movilidad en Teziutlán.
          </p>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="relative z-10">
        <ManifestoCarousel />
      </FadeIn>
    </section>
  );
}
