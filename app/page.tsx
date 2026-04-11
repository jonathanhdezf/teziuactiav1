import SignatureForm from './components/SignatureForm';
import AccordionDemands from './components/AccordionDemands';
import LawTicker from './components/LawTicker';
import FadeIn from './components/FadeIn';
import Spotlight from './components/Spotlight';
import InfoModal from './components/InfoModal';
import VideoModal from './components/VideoModal';
import ManifestoCarousel from './components/ManifestoCarousel';
import PodcastPlayer from './components/PodcastPlayer';
import Footer from './components/Footer';

// ── Data ───────────────────────────────────────────────────────
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

const stats = [
  { value: '2020', label: 'Año del reglamento', sublabel: 'Sin actualización a la economía digital' },
  { value: '0', label: 'Cajones para motos vecinales', sublabel: 'En todo el centro de Teziutlán' },
  { value: '+15K', label: 'Repartidores afectados', sublabel: 'En la región de Teziutlán y alrededores' },
  { value: '35%', label: 'Menos espacio', sublabel: 'Ocupan vs. un auto convencional' },
];

// ── Page ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <main id="main-content" className="pb-24 md:pb-0 overflow-x-clip relative">

        {/* ═══════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════ */}
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

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════
            SECTION 1 — La Realidad vs. El Reglamento
        ══════════════════════════════════════════════════════ */}
        <section
          id="problema"
          aria-labelledby="problema-heading"
          className="px-5 md:px-10 lg:px-20 py-24 max-w-7xl mx-auto relative overflow-hidden"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {problemCards.map((card, idx) => (
              <FadeIn key={card.id} direction="up" delay={0.2 + (idx * 0.15)} className="h-full">
                <article
                  id={`card-${card.id}`}
                  className="glass-card group h-full flex flex-col p-8 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] relative overflow-hidden"
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

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════
            SECTION 2 — Lo Que Pedimos
        ══════════════════════════════════════════════════════ */}
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

                <div className="mt-10 p-6 glass-card border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)] transition-all">
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

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════
            SECTION 3 — La Ley Nos Respalda (Ticker)
        ══════════════════════════════════════════════════════ */}
        <section
          id="ley"
          aria-labelledby="ley-heading"
          className="py-20 relative overflow-hidden bg-black/40"
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

        <div className="section-divider" />

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

        {/* ═══════════════════════════════════════════════════
            SECTION 4 — Quiénes Somos
        ══════════════════════════════════════════════════════ */}
        <section
          id="nosotros"
          className="px-5 md:px-10 py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
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
              <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors" />
                <blockquote className="relative z-10">
                  <p className="text-xl md:text-2xl font-display font-medium italic text-neutral-200 leading-relaxed mb-8">
                    "La vía pública es el primer espacio de democracia. Si el reglamento no sirve al ciudadano, el ciudadano debe reformar el reglamento."
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

        <div className="section-divider" />

        {/* ═══════════════════════════════════════════════════
            SECTION 5 — Formulario de Firma
        ══════════════════════════════════════════════════════ */}
        <section
          id="firma"
          aria-labelledby="firma-heading"
          className="px-5 md:px-10 lg:px-20 py-24 max-w-4xl mx-auto relative"
        >
          {/* Form Spotlight Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent blur-[80px] pointer-events-none" />

          <FadeIn direction="up">
            <div className="text-center mb-14 relative z-10">
              <div className="law-badge mb-5 mx-auto w-fit bg-red-500/10 text-red-400 border-red-500/20">Sección 04 · Tu Firma</div>
              <h2
                id="firma-heading"
                className="text-4xl md:text-6xl font-black leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Tu Nombre,{' '}
                <span className="text-orange-400">Tu Fuerza</span>
              </h2>
              <p className="text-neutral-400 mt-6 text-lg max-w-xl mx-auto leading-relaxed font-medium">
                Cada firma es un voto de confianza en un Teziutlán más justo. El H. Ayuntamiento no puede ignorar la voz unida de su ciudadanía.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} className="relative z-10">
            <SignatureForm />
          </FadeIn>

          {/* Trust indicators */}
          <FadeIn direction="up" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { 
                  icon: (
                    <svg className="w-8 h-8 text-orange-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 00-2.25 2.25z" />
                    </svg>
                  ), 
                  title: 'Datos Cifrados', 
                  text: 'Información confidencial segura' 
                },
                { 
                  icon: (
                    <svg className="w-8 h-8 text-orange-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  ), 
                  title: 'Petición Formal', 
                  text: 'Documento impreso oficial' 
                },
                { 
                  icon: (
                    <svg className="w-8 h-8 text-orange-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  ), 
                  title: 'Ayuntamiento', 
                  text: 'Presentado en Cabildo' 
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="glass-card p-7 text-center hover:bg-white/[0.04] transition-all duration-300"
                >
                  {item.icon}
                  <h4 className="text-white font-black text-sm mb-1 font-display tracking-tight">{item.title}</h4>
                  <p className="text-[12px] text-neutral-400 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-5 md:px-10 py-12 text-center bg-black/60 relative z-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="icon-badge w-10 h-10 bg-orange-500/10 border-orange-500/30">
              <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-base font-bold text-neutral-300 tracking-wide">Reforma Teziupark · Petición Ciudadana</span>
          </div>
          <p className="text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Esta petición es una iniciativa ciudadana independiente dirigida formalmente al H. Ayuntamiento de Teziutlán, Puebla. Los datos recopilados se utilizan exclusivamente para cuantificar y respaldar la exigencia ciudadana. No solicitamos financiamiento ni representamos partido político alguno.
          </p>
          <div className="w-16 h-px bg-white/10 mx-auto" />
          <p className="text-xs text-neutral-600 font-medium tracking-wide">
            © {new Date().getFullYear()} · MOTOCICLISTAS Y REPARTIDORES DE TEZIUTLÁN · PUEBLA, MÉXICO
          </p>
        </div>
      </footer>

      {/* ── Sticky CTA (mobile only) ────────────────────────── */}
      <div className="sticky-cta md:hidden pb-safe text-center">
        <a
          href="#firma"
          id="sticky-cta-btn"
          className="btn-primary w-full py-4 rounded-xl text-[15px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
          Firma la Exigencia
        </a>
      </div>

      <Footer />
    </>
  );
}