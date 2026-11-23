'use client';
import { useEffect, useRef, useState } from 'react';
import { FiUploadCloud, FiImage, FiCheckCircle, FiTrash2, FiSave } from 'react-icons/fi';

export default function ImagesAdminPage() {
  const [profileImage, setProfileImage] = useState('/photo/neel-profile.png');
  const [uploaded, setUploaded] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingPreview, setPendingPreview] = useState('');
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

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setSuccess('');

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10 MB.');
      return;
    }

    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
  };

  const clearPending = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview('');
    setError('');
    setSuccess('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeCurrentImage = async () => {
    if (!confirm('Remove the current profile image and restore the default image?')) return;
    setError('');
    setSuccess('');
    setUploading(true);
    try {
      const response = await fetch('/api/admin/images', { method: 'DELETE' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to remove image');
      clearPending();
      setProfileImage('/photo/neel-profile.png');
      setUploaded(null);
      localStorage.removeItem('profile_image');
      window.dispatchEvent(new CustomEvent('profile-image-update', { detail: data }));
      setSuccess('Profile image removed. Default image restored.');
    } catch (removeError) {
      setError(removeError.message || 'Unable to remove image.');
    } finally {
      setUploading(false);
    }
  };

  const saveImage = async () => {
    if (!pendingFile) return;
    setError('');
    setSuccess('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', pendingFile);
    try {
      const response = await fetch('/api/admin/images', { method: 'POST', body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      setProfileImage(data.profile);
      setUploaded(data);
      clearPending();
      localStorage.setItem('profile_image', JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('profile-image-update', { detail: data }));
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('profile-image');
        channel.postMessage(data);
        channel.close();
      }
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
          <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] mb-3">
            {pendingPreview ? 'New Image Preview' : 'Current Profile Image'}
          </p>
          <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            {/* Previewing a user-selected local file before saving keeps the live profile unchanged. */}
            <img src={pendingPreview || profileImage} alt="Profile preview" className="w-full h-full object-cover" />
          </div>
        </div>

        {uploaded?.filename && (
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              Current file: <span className="text-white/60">{uploaded.filename}</span>
            </p>
            <button
              type="button"
              onClick={removeCurrentImage}
              disabled={uploading}
              className="min-h-10 px-4 border border-red-400/20 text-red-400/80 hover:text-red-300 hover:border-red-400/40 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <FiTrash2 size={14} />
              Remove Current Image
            </button>
          </div>
        )}

        <input ref={fileRef} id="profile-image-upload" type="file" accept="image/*" onChange={selectImage} className="hidden" />
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

        {pendingFile && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={clearPending}
              disabled={uploading}
              className="min-h-12 border border-white/10 rounded-xl text-white/50 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
            >
              <FiTrash2 size={15} />
              Cancel
            </button>
            <button
              type="button"
              onClick={saveImage}
              disabled={uploading}
              className="min-h-12 bg-[#ff6b1a] text-black rounded-xl font-bold hover:bg-[#ff8a42] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {uploading ? (
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <FiSave size={15} />
              )}
              {uploading ? 'Saving...' : 'Save Image'}
            </button>
          </div>
        )}

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
