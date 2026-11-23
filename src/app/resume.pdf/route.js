import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  if (!supabase) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'resume_pdf')
    .maybeSingle();

  const url = data?.value?.url;
  if (url) return NextResponse.redirect(url, 307);
  return NextResponse.redirect(new URL('/', request.url));
}
