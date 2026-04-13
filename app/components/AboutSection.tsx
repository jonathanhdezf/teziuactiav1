'use client';

import FadeIn from './FadeIn';
import VisitorCounter from './VisitorCounter';

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      className="px-5 md:px-10 py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
            <VisitorCounter />
            <div className="law-badge mb-6 w-fit bg-orange-500/10 text-orange-400 border-orange-500/20">Movimiento Ciudadano</div>
            <h2 className="text-4xl md:text-5xl font-black font-display leading-tight mb-8">
              Ciudadanos Libres,<br />
              <span className="text-orange-400">Acciones Colectivas</span>
            </h2>
            <div className="prose prose-invert space-y-6 text-neutral-400">
              <p>
                Somos una iniciativa ciudadana conformada por vecinos, comerciantes, repartidores y motociclistas de Teziutlán que creemos en una ciudad moderna pero, sobre todo, justa.
              </p>
              <p>
                No pertenecemos a ningún partido político. Nuestra única bandera es el respeto al derecho de movilidad y el trato digno por parte de las autoridades municipales.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-neutral-300 uppercase">Sin fines de lucro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs font-bold text-neutral-300 uppercase">100% Ciudadano</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.2}>
          <div className="glass-card relative overflow-hidden group" style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors" />
            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-bold text-white leading-relaxed italic mb-6">
                &quot;La vía pública es el primer espacio de democracia. Si el reglamento no sirve al ciudadano, el ciudadano debe reformar el reglamento.&quot;
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-px bg-orange-500" />
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-widest leading-none">Colectivo Teziuactua</p>
                  <p className="text-[10px] text-orange-500 font-bold uppercase mt-1 tracking-wider">Unión Pro-Movilidad 2026</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
