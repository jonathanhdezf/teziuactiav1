import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limiter';
import { getIPFromRequest, hashIP } from '@/lib/ip-hash';

interface SignatureRequest {
  nombre: string;
  domicilio: string;
  telefono?: string;
  honeypot?: string; // Anti-bot field
}

/**
 * POST /api/signatures
 * 
 * Validates, rate limits, and stores a citizen petition signature
 */
export async function POST(request: NextRequest) {
  // Check if Supabase is configured
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'placeholder-key') {
    return NextResponse.json(
      { error: 'Servicio no disponible', message: 'El backend de firmas aún no está configurado. Contacta al administrador.' },
      { status: 503 }
    );
  }

  try {
    const body: SignatureRequest = await request.json();
    const { nombre, domicilio, telefono, honeypot } = body;

    // 1. Honeypot check (bots fill all fields)
    if (honeypot && honeypot.trim().length > 0) {
      console.log('Honeypot triggered - potential bot');
      return NextResponse.json(
        { error: 'Solicitud rechazada' },
        { status: 403 }
      );
    }

    // 2. Server-side validation
    const errors: Record<string, string> = {};

    if (!nombre || nombre.trim().length < 3) {
      errors.nombre = 'Nombre completo requerido (mínimo 3 caracteres)';
    }

    if (!domicilio || domicilio.trim().length < 5) {
      errors.domicilio = 'Domicilio requerido (colonia, calle o referencia)';
    }

    if (telefono && telefono.trim().length > 0 && telefono.trim().length < 10) {
      errors.telefono = 'Número de teléfono inválido';
    }

    // Sanitize inputs
    const sanitizedNombre = nombre.trim().replace(/[<>]/g, '');
    const sanitizedDomicilio = domicilio.trim().replace(/[<>]/g, '');
    const sanitizedTelefono = telefono?.trim().replace(/[<>]/g, '') || '';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // 3. Rate limiting by IP
    const ip = getIPFromRequest(request);
    const ipHash = await hashIP(ip);
    const rateLimit = await checkRateLimit(ipHash, 3, 3600000); // 3 per hour

    if (!rateLimit.success) {
      const resetMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: 'Demasiados intentos',
          message: `Has excedido el límite de firmas. Intenta de nuevo en ${resetMinutes} minutos.`,
        },
        { status: 429 }
      );
    }

    // 4. Check for duplicate signature (same IP within 24h)
    const { data: existingSignatures, error: duplicateError } = await supabaseAdmin
      .from('signatures')
      .select('id')
      .eq('ip_hash', ipHash)
      .gt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(1);

    if (duplicateError) {
      console.error('Duplicate check error:', duplicateError);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }

    if (existingSignatures && existingSignatures.length > 0) {
      return NextResponse.json(
        {
          error: 'Firma duplicada',
          message: 'Ya registraste tu firma en las últimas 24 horas.',
        },
        { status: 409 }
      );
    }

    // 5. Insert signature
    const { data: signature, error: insertError } = await supabaseAdmin
      .from('signatures')
      .insert({
        nombre: sanitizedNombre,
        domicilio: sanitizedDomicilio,
        telefono: sanitizedTelefono || null,
        ip_hash: ipHash,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Error al registrar la firma. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // 6. Get updated count
    const { count: totalCount } = await supabaseAdmin
      .from('signatures')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: 'Firma registrada exitosamente',
      signatureCount: totalCount || 0,
    });
  } catch (error) {
    console.error('Signature API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/signatures/count
 * 
 * Returns public signature count (no PII)
 */
export async function GET() {
  // Check if Supabase is configured
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'placeholder-key') {
    return NextResponse.json({ total: 0 });
  }

  try {
    const { count } = await supabaseAdmin
      .from('signatures')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      total: count || 0,
    });
  } catch (error) {
    console.error('Count API error:', error);
    return NextResponse.json(
      { total: 0, error: 'Unable to fetch count' },
      { status: 500 }
    );
  }
}
