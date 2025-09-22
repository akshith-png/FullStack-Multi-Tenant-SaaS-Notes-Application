import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { title, content } = body;

  const { data, error } = await supabase
    .from('notes')
    .update({ title, content })
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('notes').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}