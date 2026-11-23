import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';

async function isAdmin() {
  if (!supabase) return false;
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

export async function GET() {
  if (!supabase) return NextResponse.json({ url: '', filename: '' });
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'resume_pdf')
    .maybeSingle();
  return NextResponse.json(data?.value || { url: '', filename: '' });
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No resume file provided' }, { status: 400 });
  }
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Resume must be smaller than 10 MB' }, { status: 400 });
  }

  const bucket = 'resumes';
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((item) => item.name === bucket)) {
    const { error: bucketError } = await supabase.storage.createBucket(bucket, { public: true });
    if (bucketError) {
      return NextResponse.json({ error: bucketError.message }, { status: 500 });
    }
  }

  const filename = `resume-${Date.now()}.pdf`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, { contentType: 'application/pdf', upsert: false });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filename);
  const resume = {
    url: publicUrl.publicUrl,
    filename: file.name,
    uploadedAt: new Date().toISOString(),
  };

  const { error: settingsError } = await supabase
    .from('settings')
    .upsert({ key: 'resume_pdf', value: resume }, { onConflict: 'key' });
  if (settingsError) {
    return NextResponse.json({ error: settingsError.message }, { status: 500 });
  }

  return NextResponse.json(resume);
}
