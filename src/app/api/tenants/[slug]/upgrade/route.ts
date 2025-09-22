import { supabase } from '@/lib/supabase';
import { extractToken, verifyJWT } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const token = extractToken(req);
    const user = verifyJWT(token);

    // Only Admins can upgrade
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update tenant plan to 'pro'
    const { error } = await supabase
      .from('tenants')
      .update({ plan: 'pro' })
      .eq('slug', params.slug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ upgraded: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}