import { supabase } from '@/lib/supabase';
import { extractToken, verifyJWT } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const token = extractToken(req);
    const user = verifyJWT(token);

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('tenant_id', user.tenant_id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const token = extractToken(req);
    const user = verifyJWT(token);

    const { title, content } = await req.json();

    const { count } = await supabase
      .from('notes')
      .select('id', { count: 'exact' })
      .eq('tenant_id', user.tenant_id);

    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('plan')
      .eq('id', user.tenant_id)
      .single();

    if (tenantError) {
      return NextResponse.json({ error: tenantError.message }, { status: 500 });
    }

    if (tenant.plan === 'free' && count >= 3) {
      return NextResponse.json({ error: 'Note limit reached' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, tenant_id: user.tenant_id }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}