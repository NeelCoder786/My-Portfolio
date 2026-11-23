import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';

async function isAdmin() {
  const store = await cookies();
  const token = store.get('admin_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  }
  const { searchParams } = new URL(request.url);
  const admin = await isAdmin();
  const category = searchParams.get('category');

  const buildQuery = (includeSortOrder = true, includeVisibility = true) => {
    let query = supabase
    .from('works')
      .select('*');

    if (includeSortOrder) {
      query = query.order('sort_order', { ascending: true });
    }
    query = query.order('created_at', { ascending: false });
    if (includeVisibility && !(searchParams.get('all') === 'true' && admin)) {
    query = query.eq('visible', true);
    }
    if (category && category !== 'All') {
    query = query.eq('category', category);
    }
    return query;
  };

  let query = buildQuery();

  let { data: works, error } = await query;
  if (error && /(sort_order|visible)/i.test(error.message)) {
    ({ data: works, error } = await buildQuery(false, false));
  }
  if (error) {
    if (error.code === '42501' || /permission denied|privileges/i.test(error.message)) {
      return NextResponse.json([], { status: 200 });
    }
    console.error('[GET /api/works]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(works || []);
}

export async function POST(request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  }
  if (!(await isAdmin())) {
    console.error('[POST /api/works] Unauthorized — no valid admin_token cookie');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  console.log('[POST /api/works] Inserting:', body.title);

  const { data: work, error } = await supabase
    .from('works')
    .insert([body])
    .select()
    .single();

  if (error) {
    console.error('[POST /api/works] Insert error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('[POST /api/works] Success, id:', work.id);
  return NextResponse.json(work, { status: 201 });
}
