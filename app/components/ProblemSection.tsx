'use client';

import FadeIn from './FadeIn';

const problemCards = [
  {
    id: 'exclusion',
    icon: (
      <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    number: '01',
    title: 'Exclusión Injustificada',
    body: 'El Reglamento de Estacionómetros "Teziupark" vigente desde 2020 excluye a las motocicletas de los cajones sin sustento técnico, jurídico ni urbanístico que lo respalde.',
    highlight: 'Sin fundamento legal',
  },
  {
    id: 'abuso',
    icon: (
      <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    number: '02',
    title: 'Abuso Tarifario',
    body: 'Ocupamos menos de un tercio del espacio de un cajón convencional, pero la ausencia de espacios designados nos obliga a estacionar en zonas prohibidas bajo amenaza de multas desproporcionadas.',
    highlight: 'Multas injustas',
  },
  {
    id: 'economia',
    icon: (
      <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    number: '03',
    title: 'Golpe a la Economía',
    body: 'Un repartidor realiza entre 15 y 40 paradas diarias en zonas comerciales. Cada minuto perdido buscando dónde detenerse sin ser multado es dinero que sale directamente de su bolsillo.',
    highlight: '-40 entregas diarias en riesgo',
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="px-5 md:px-8 lg:px-16 py-24 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <FadeIn direction="up">
        <div className="text-center mb-16 relative z-10">
          <div className="law-badge mb-5 mx-auto w-fit">Sección 01</div>
          <h2
            id="problema-heading"
            className="text-3xl md:text-5xl font-black font-display"
            style={{ letterSpacing: '-0.02em' }}
          >
            La Realidad vs.{' '}
            <span className="text-orange-400">El Reglamento</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto lead">
            Mientras la economía de plataformas creció un 340% en México tras la pandemia, el Reglamento Teziupark sigue ignorando a miles de trabajadores que mueven la ciudad.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {problemCards.map((card, idx) => (
          <FadeIn key={card.id} direction="up" delay={0.2 + (idx * 0.15)} className="h-full">
            <article
              id={`card-${card.id}`}
              className="glass-card group h-full flex flex-col transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] relative overflow-hidden"
              style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                {card.icon}
              </div>
              <div className="flex items-start justify-between mb-8">
                <div className="icon-badge w-14 h-14 bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  {card.icon}
                </div>
                <span
                  className="text-6xl font-black text-neutral-800/50 select-none group-hover:text-neutral-700/50 transition-colors font-display"
                  aria-hidden="true"
                >
                  {card.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-neutral-100 mb-4 group-hover:text-orange-400 transition-colors font-display">
                  {card.title}
                </h3>
                <p className="text-sm font-medium">
                  {card.body}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-px bg-orange-500/50" />
                <span className="text-xs font-bold text-orange-400 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  {card.highlight}
                </span>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
