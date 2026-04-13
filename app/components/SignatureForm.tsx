'use client';

import { useState, useTransition, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
  signatureCount?: number;
}

export default function SignatureForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [isPending, startTransition] = useTransition();
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [fields, setFields] = useState({
    nombre: '',
    domicilio: '',
    telefono: '',
    acepta: false,
    honeypot: '', // Anti-bot honeypot field (hidden from users)
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch real signature count on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchCount() {
      try {
        const res = await fetch('/api/signatures/count');
        const data = await res.json();
        if (!cancelled && data.total) {
          setTotalCount(data.total);
        }
      } catch {
        // Silently fail, count stays null
      }
    }
    fetchCount();
    return () => { cancelled = true; };
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fields.nombre.trim() || fields.nombre.trim().length < 3)
      errs.nombre = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
    if (!fields.domicilio.trim() || fields.domicilio.trim().length < 5)
      errs.domicilio = 'Ingresa tu domicilio (colonia, calle o referencia).';
    if (!fields.acepta)
      errs.acepta = 'Debes aceptar los términos para firmar.';
    if (fields.telefono && fields.telefono.trim().length > 0 && fields.telefono.trim().length < 10)
      errs.telefono = 'Número de teléfono inválido (mínimo 10 dígitos).';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFields(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    startTransition(async () => {
      setFormState({ status: 'submitting' });
      try {
        const res = await fetch('/api/signatures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: fields.nombre,
            domicilio: fields.domicilio,
            telefono: fields.telefono,
            honeypot: fields.honeypot,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || data.error || 'Error al registrar la firma');
        }

        setTotalCount(data.signatureCount);
        setFormState({ status: 'success', signatureCount: data.signatureCount });
        setFields({ nombre: '', domicilio: '', telefono: '', acepta: false, honeypot: '' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ocurrió un error al enviar. Inténtalo de nuevo.';
        setFormState({ status: 'error', message });
      }
    });
  };

  if (formState.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="form-glass p-10 md:p-16 text-center space-y-10 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex justify-center relative z-10">
          <div className="relative w-24 h-24 pulse-ring">
            <div className="icon-badge w-24 h-24 bg-orange-500/10 border-orange-500/30">
              <svg className="w-12 h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-4xl font-black text-white font-display">
            ¡Tu firma cuenta!
          </h3>
          <p className="text-neutral-300 mt-4 text-lg leading-relaxed">
            Te has unido a{' '}
            <span className="text-amber-400 font-black text-xl drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              {formState.signatureCount ?? totalCount ?? 'muchos'} ciudadanos
            </span>{' '}
            que exigen movilidad justa en Teziutlán.
          </p>
        </div>
        <p className="text-sm text-neutral-500 relative z-10 max-w-sm mx-auto">
          Comparte esta página con otros motociclistas y repartidores para sumar más voces.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Reforma Teziupark', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado!');
              }
            }}
            className="btn-primary px-8 py-3.5 rounded-xl text-sm items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Compartir petición
          </button>
          <button
            onClick={() => setFormState({ status: 'idle' })}
            className="px-8 py-3.5 rounded-xl border border-neutral-700 bg-neutral-800/50 text-sm font-semibold text-neutral-300 hover:border-neutral-500 hover:text-white transition-all duration-300"
          >
            Firmar otra vez
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="form-glass !p-10 md:!p-16">
      <div className="mb-8 text-center">
        <div className="law-badge mb-4 mx-auto w-fit">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Petición oficial ciudadana
        </div>
        <h2 className="text-3xl md:text-4xl font-black leading-tight font-display">
          Súmate a los{' '}
          {totalCount !== null ? (
            <span className="text-orange-400">{totalCount.toLocaleString()} ciudadanos</span>
          ) : (
            <span className="text-orange-400">ciudadanos</span>
          )}{' '}
          que exigen movilidad justa
        </h2>
        <p className="mt-3 text-base">
          Tu firma es tu voz. Cada registro se presenta ante el H. Ayuntamiento de Teziutlán como evidencia de la voluntad ciudadana.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* HONEYPOT - Hidden from users, catches bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">No llenes este campo</label>
          <input
            id="website"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={fields.honeypot}
            onChange={handleChange}
          />
        </div>

        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <svg className="w-4 h-4 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Nombre completo <span className="text-orange-500">*</span>
          </label>
          <div className="relative group">
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              placeholder="Ej. Juan Carlos Martínez López"
              value={fields.nombre}
              onChange={handleChange}
              className="form-input"
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
              aria-invalid={errors.nombre ? true : false}
            />
            <div className="absolute inset-0 rounded-3xl group-focus-within:ring-2 ring-orange-500/20 pointer-events-none transition-all duration-300" />
          </div>
          {errors.nombre && (
            <p id="nombre-error" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5 pl-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Domicilio */}
        <div className="space-y-2">
          <label htmlFor="domicilio" className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <svg className="w-4 h-4 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Domicilio <span className="text-orange-500">*</span>
          </label>
          <div className="relative group">
            <input
              id="domicilio"
              name="domicilio"
              type="text"
              autoComplete="street-address"
              placeholder="Colonia, calle o referencia (Teziutlán, Pue.)"
              value={fields.domicilio}
              onChange={handleChange}
              className="form-input"
              aria-describedby={errors.domicilio ? 'domicilio-error' : undefined}
              aria-invalid={errors.domicilio ? true : false}
            />
          </div>
          {errors.domicilio && (
            <p id="domicilio-error" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5 pl-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.domicilio}
            </p>
          )}
        </div>

        {/* Teléfono (opcional) */}
        <div className="space-y-2">
          <label htmlFor="telefono" className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
            <svg className="w-4 h-4 text-orange-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Teléfono / WhatsApp{' '}
            <span className="text-neutral-500 font-normal text-[10px] uppercase tracking-wider">(opcional)</span>
          </label>
          <div className="relative group">
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="Ej. 2331234567"
              value={fields.telefono}
              onChange={handleChange}
              className="form-input"
              aria-describedby={errors.telefono ? 'telefono-error' : undefined}
              aria-invalid={errors.telefono ? true : false}
            />
          </div>
          {errors.telefono && (
            <p id="telefono-error" className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5 pl-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.telefono}
            </p>
          )}
        </div>

        {/* Términos */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                id="acepta"
                name="acepta"
                type="checkbox"
                className="sr-only"
                checked={fields.acepta}
                onChange={handleChange}
                aria-describedby={errors.acepta ? 'acepta-error' : undefined}
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  fields.acepta
                    ? 'bg-orange-500 border-orange-500'
                    : 'bg-transparent border-neutral-600 group-hover:border-neutral-400'
                }`}
                onClick={() => {
                  setFields(p => ({ ...p, acepta: !p.acepta }));
                  if (errors.acepta) setErrors(pr => { const n = { ...pr }; delete n.acepta; return n; });
                }}
                role="checkbox"
                aria-checked={fields.acepta}
                tabIndex={0}
                onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { setFields(p => ({ ...p, acepta: !p.acepta })); } }}
              >
                {fields.acepta && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-neutral-400 leading-snug">
              Doy mi consentimiento para que mis datos sean utilizados exclusivamente con fines de esta petición ciudadana dirigida al H. Ayuntamiento de Teziutlán. <span className="text-orange-400/90 font-medium">No compartiremos tu información con terceros.</span>
            </span>
          </label>
          {errors.acepta && (
            <p id="acepta-error" className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.acepta}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          id="submit-firma"
          type="submit"
          disabled={formState.status === 'submitting' || isPending}
          className="btn-primary w-full py-4.5 rounded-2xl text-base tracking-widest flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed group/btn overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none" />

          {formState.status === 'submitting' || isPending ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Procesando Firma...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
              <span>Firmar la Petición ahora</span>
            </>
          )}
        </button>

        {formState.status === 'error' && (
          <p className="text-red-400 text-sm text-center mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            {formState.message}
          </p>
        )}
      </form>

      <p className="text-[11px] text-neutral-600 text-center mt-8 leading-relaxed flex items-center justify-center gap-2">
        <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 00-2.25 2.25z" />
        </svg>
        <span>Tus datos están protegidos por la LFPDPPP. Conexión cifrada de punto a punto.</span>
      </p>
    </div>
  );
}
