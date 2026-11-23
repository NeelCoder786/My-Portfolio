'use client';
import { useEffect, useRef, useState } from 'react';
import { FiUploadCloud, FiImage, FiCheckCircle } from 'react-icons/fi';

export default function ImagesAdminPage() {
  const [profileImage, setProfileImage] = useState('/photo/neel-profile.png');
  const [uploaded, setUploaded] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    fetch('/api/admin/images')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.profile) {
          setProfileImage(data.profile);
          setUploaded(data);
        }
      })
      .catch(() => {});
  }, []);

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setSuccess('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/admin/images', { method: 'POST', body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      setProfileImage(data.profile);
      setUploaded(data);
      setSuccess('Profile image updated.');
    } catch (uploadError) {
      setError(uploadError.message || 'Unable to upload image.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-white font-black text-3xl tracking-tight mb-1">Images</h1>
        <p className="text-white/30 text-sm">Upload and replace the profile image shown on the About page.</p>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-5 md:p-8">
        <div className="mb-6">
          <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] mb-3">Current Profile Image</p>
          <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {uploaded?.filename && (
          <p className="mb-4 text-xs text-white/30">
            Current file: <span className="text-white/60">{uploaded.filename}</span>
          </p>
        )}

        <input ref={fileRef} id="profile-image-upload" type="file" accept="image/*" onChange={uploadImage} className="hidden" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full min-h-36 border border-dashed border-white/15 hover:border-[#ff6b1a]/50 rounded-2xl flex flex-col items-center justify-center gap-3 text-white/40 hover:text-white/70 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-7 h-7 border-2 border-white/20 border-t-[#ff6b1a] rounded-full animate-spin" />
          ) : (
            <FiUploadCloud size={28} />
          )}
          <span className="text-xs uppercase tracking-[0.25em] font-bold">
            {uploading ? 'Uploading...' : 'Upload Profile Image'}
          </span>
          <span className="text-[10px] text-white/20 flex items-center gap-1">
            <FiImage size={12} /> Image only · Maximum 10 MB
          </span>
        </button>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        {success && (
          <p className="mt-4 flex items-center gap-2 text-sm text-green-400">
            <FiCheckCircle size={16} />
            {success}
          </p>
        )}
      </div>
    </div>
  );
}
