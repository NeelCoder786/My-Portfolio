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
  if (!supabase) {
    return NextResponse.json({ profile: '/photo/neel-profile.png' });
  }
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'profile_image')
    .maybeSingle();
  return NextResponse.json(data?.value || { profile: '/photo/neel-profile.png' });
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
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image must be smaller than 10 MB' }, { status: 400 });
  }

  const bucket = 'profile-images';
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((item) => item.name === bucket)) {
    const { error: bucketError } = await supabase.storage.createBucket(bucket, { public: true });
    if (bucketError && bucketError.message !== 'The resource already exists') {
      return NextResponse.json({ error: `Unable to prepare profile-images bucket: ${bucketError.message}` }, { status: 500 });
    }
  }

  const extensionByMime = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  };
  const extension = extensionByMime[file.type] || 'jpg';
  const filename = `profile-${Date.now()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filename, buffer, { contentType: file.type, upsert: false });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filename);
  const image = {
    profile: publicUrl.publicUrl,
    filename: file.name,
    uploadedAt: new Date().toISOString(),
  };
  const { error: settingsError } = await supabase
    .from('settings')
    .upsert({ key: 'profile_image', value: image }, { onConflict: 'key' });
  if (settingsError) return NextResponse.json({ error: settingsError.message }, { status: 500 });

  return NextResponse.json(image);
}

export async function DELETE() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!supabase) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
  }

  const { data: current } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'profile_image')
    .maybeSingle();

  const profileUrl = current?.value?.profile;
  if (profileUrl) {
    try {
      const url = new URL(profileUrl);
      const marker = '/storage/v1/object/public/profile-images/';
      const markerIndex = url.pathname.indexOf(marker);
      if (markerIndex >= 0) {
        const filename = decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
        if (filename) {
          await supabase.storage.from('profile-images').remove([filename]);
        }
      }
    } catch {
      // The database setting can still be cleared even if the old URL is malformed.
    }
  }

  const { error } = await supabase
    .from('settings')
    .delete()
    .eq('key', 'profile_image');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: '/photo/neel-profile.png' });
}
