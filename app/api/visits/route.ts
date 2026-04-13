import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getIPFromRequest, hashIP } from '@/lib/ip-hash';

/**
 * GET /api/visits
 * 
 * Records a visit and returns the current unique visitor count
 */
export async function GET(request: NextRequest) {
  try {
    const ip = getIPFromRequest(request);
    const ipHash = await hashIP(ip);
    const userAgent = request.headers.get('user-agent') || '';

    // Check if this IP already visited in the last 24h (don't double-count)
    const { data: existingVisit } = await supabaseAdmin
      .from('site_visits')
      .select('id')
      .eq('ip_hash', ipHash)
      .gt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single();

    // If not visited recently, record it
    if (!existingVisit) {
      await supabaseAdmin
        .from('site_visits')
        .insert({
          ip_hash: ipHash,
          user_agent: userAgent,
          page: '/',
        });
    }

    // Get unique visitor count (last 30 days)
    const { data, error } = await supabaseAdmin
      .rpc('get_unique_visitor_count');

    if (error) {
      // Fallback: just count all rows if function doesn't exist
      const { count } = await supabaseAdmin
        .from('site_visits')
        .select('*', { count: 'exact', head: true });
      
      return NextResponse.json({ 
        count: count || 1,
        isUnique: !existingVisit
      });
    }

    return NextResponse.json({ 
      count: data || 1,
      isUnique: !existingVisit
    });
  } catch (error) {
    console.error('Visits API error:', error);
    // Fallback to 1 if everything fails
    return NextResponse.json({ count: 1, isUnique: true });
  }
}
