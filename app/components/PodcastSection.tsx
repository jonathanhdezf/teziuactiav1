'use client';

import FadeIn from './FadeIn';
import PodcastPlayer from './PodcastPlayer';

export default function PodcastSection() {
  return (
    <section
      id="podcast"
      className="px-5 md:px-10 py-24 relative overflow-hidden bg-neutral-900/40"
    >
      {/* Ambient light highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      <FadeIn direction="up">
        <div className="text-center mb-16 relative z-10">
          <div className="law-badge mb-5 mx-auto w-fit text-amber-400 border-amber-500/20 bg-amber-500/5">Transmisión Especial</div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight font-display">
            Voces en la <span className="text-orange-400">Calle</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-lg max-w-xl mx-auto font-medium">
            Escucha el testimonio directo de quienes recorren nuestra ciudad día a día.
          </p>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="relative z-10">
        <PodcastPlayer />
      </FadeIn>
    </section>
  );
}
