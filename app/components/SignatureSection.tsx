'use client';

import FadeIn from './FadeIn';
import SignatureForm from './SignatureForm';

export default function SignatureSection() {
  return (
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
  );
}
