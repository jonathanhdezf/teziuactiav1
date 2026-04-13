'use client';

import { useState } from 'react';

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const items: AccordionItem[] = [
  {
    id: 'inclusion',
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Inclusión Expresa al Reglamento',
    description:
      'Reforma inmediata al Reglamento de Estacionómetros "Teziupark" para reconocer explícitamente el derecho de los motociclistas a usar los cajones en igualdad de condiciones que los demás vehículos de motor, sin restricciones arbitrarias.',
  },
  {
    id: 'tarifa',
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tarifa Proporcional Justa (50%)',
    description:
      'Las motocicletas ocupan entre el 25 % y 35 % del espacio de un cajón convencional. Exigimos que la tarifa aplicada sea proporcional a esa ocupación real: el equivalente al 50 % de la tarifa general, en concordancia con criterios de equidad y proporcionalidad.',
  },
  {
    id: 'multas',
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'Cese Inmediato de Multas por Exclusión',
    description:
      'Instrucción oficial e inmediata a los elementos de vialidad para suspender toda infracción emitida como consecuencia directa de la exclusión provocada por el reglamento vigente, mientras se tramita y aprueba la reforma correspondiente.',
  },
  {
    id: 'parada',
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Zonas de Parada Breve (10 min sin costo)',
    description:
      'Establecimiento de zonas de parada breve frente a comercios y restaurantes en las áreas de mayor concentración de entregas, con tolerancia de 10 minutos sin cargo para trabajadores de plataformas digitales debidamente registrados (Rappi, DiDi Food, Uber Eats, plataformas locales, etc.).',
  },
];

export default function AccordionDemands() {
  const [openId, setOpenId] = useState<string | null>('inclusion');

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`glass-card overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-orange-500/30 shadow-lg shadow-orange-500/10' : ''
            }`}
          >
            <button
              id={`accordion-btn-${item.id}`}
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls={`accordion-content-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center gap-4 px-6 py-5 text-left group"
            >
              <div className={`icon-badge w-11 h-11 flex-shrink-0 transition-all duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-105'}`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-orange-500 tracking-widest uppercase">
                    Demanda {idx + 1}
                  </span>
                </div>
                <p className="text-sm md:text-base font-bold text-neutral-100 mt-0.5">
                  {item.title}
                </p>
              </div>
              <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className={`accordion-content ${isOpen ? 'open' : ''}`}
            >
              <div className="px-5 pb-5 pt-0">
                <p className="text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
