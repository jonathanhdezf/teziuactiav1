'use client';

import { useEffect, useRef, useState } from 'react';

const items = [
  { badge: 'Constitución Mexicana · Art. 1°', text: 'Queda prohibida toda discriminación motivada por origen étnico, condición social o cualquier otra que atente contra la dignidad humana.' },
  { badge: 'Ley de Movilidad de Puebla · Art. 8', text: 'Todo habitante tiene derecho a desplazarse en condiciones de igualdad, seguridad y accesibilidad en la vía pública.' },
  { badge: 'Ley del Trabajo · Art. 3°', text: 'El trabajo es un derecho y un deber sociales. No podrán establecerse distinciones que menoscaben la dignidad del trabajador.' },
  { badge: 'Reglamento de Tránsito · Pue.', text: 'La motocicleta es un vehículo de motor con plenos derechos de circulación y uso de la vía pública en igualdad de condiciones.' },
  { badge: 'Derecho de Petición · Art. 8° Const.', text: 'Los funcionarios y empleados públicos respetarán el ejercicio del derecho de petición, siempre que ésta se formule por escrito.' },
];

export default function LawTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.animationPlayState = isPaused ? 'paused' : 'running';
  }, [isPaused]);

  return (
    <div
      className="relative flex overflow-hidden group whitespace-nowrap font-display py-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Fundamentos legales de la petición"
      role="marquee"
    >
      <div ref={trackRef} className="ticker-inner flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 mx-6 flex-shrink-0"
            style={{ minWidth: 'max-content' }}
          >
            {/* Separator dot */}
            {i > 0 && (
              <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 opacity-60" />
            )}
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-orange-400 tracking-widest uppercase whitespace-nowrap">
                ⚖ {item.badge}
              </span>
              <span className="text-sm text-neutral-300 whitespace-nowrap">
                "{item.text}"
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
