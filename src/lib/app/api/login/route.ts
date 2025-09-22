import { supabase } from '@/lib/app/api/login/supabase';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, role, tenant_id')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (!user || error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1d' });

  return NextResponse.json({ token });
}