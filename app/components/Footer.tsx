'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { useFocusTrap } from '../hooks/useFocusTrap';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const privacyModalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(privacyModalRef, isPrivacyOpen);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPrivacyOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-5 md:px-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image src="/assets/teziuactua-logo-oficial.png" alt="Teziuactua Logo" width={240} height={60} className="h-14 w-auto object-contain" />
            </div>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
              Plataforma ciudadana independiente dedicada a la mejora de la movilidad y el respeto a los derechos de los habitantes de Teziutlán.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook Teziuactua" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Twitter Teziuactua" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Navegación</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#problema" className="hover:text-white transition-colors">El Problema</a></li>
              <li><a href="#manifiesto" className="hover:text-white transition-colors">Manifiesto</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Quiénes Somos</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-400">
              <li>
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Aviso de Privacidad
                </button>
              </li>
              <li className="text-[10px] text-neutral-600 uppercase tracking-widest mt-4">
                © 2026 Teziutlán, Puebla.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">
            Por una movilidad justa y moderna
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Plataforma Activa</span>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
              ref={privacyModalRef}
              role="dialog"
              aria-modal="true"
              aria-label="Aviso de Privacidad"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h3 className="text-sm font-black text-white uppercase tracking-widest font-display">Aviso de Privacidad</h3>
                <button onClick={() => setIsPrivacyOpen(false)} aria-label="Cerrar aviso de privacidad" className="text-neutral-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar prose prose-invert prose-sm">
                <p className="font-bold text-orange-400">Responsable de tus datos:</p>
                <p>
                  El Colectivo Ciudadano Teziuactua es el responsable del tratamiento de los datos personales que nos proporciones a través de este formulario de firmas.
                </p>
                <p className="font-bold text-orange-400">Finalidad del tratamiento:</p>
                <p>
                  Los datos recolectados (Nombre, Teléfono y Correo Electrónico) serán utilizados exclusivamente para:
                </p>
                <ul>
                  <li>Validar la legitimidad de la petición ciudadana ante el H. Ayuntamiento de Teziutlán.</li>
                  <li>Informar sobre avances en la negociación y reforma del reglamento.</li>
                  <li>Convocatorias a acciones civiles pacíficas relacionadas con la movilidad.</li>
                </ul>
                <p className="font-bold text-orange-400">Protección y Seguridad:</p>
                <p>
                  Tus datos están protegidos bajo protocolos de encriptación y no serán compartidos, vendidos ni transferidos a terceros con fines comerciales. Solo serán presentados como respaldo documental ante la autoridad competente en el marco del derecho de petición (Art. 8 constitucional).
                </p>
                <p>
                  Al firmar, otorgas tu consentimiento para el uso de estos datos con los fines exclusivamente descritos.
                </p>
                <div className="pt-6 border-t border-white/5 mt-8 opacity-50 text-[10px]">
                  Actualización: Abril 2026 · Teziutlán, Puebla.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
