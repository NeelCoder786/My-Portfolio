'use client';
import { useEffect, useRef, useState } from 'react';
import { FiUploadCloud, FiFileText, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

export default function ResumeAdminPage() {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    fetch('/api/admin/resume')
      .then(r => r.ok ? r.json() : null)
      .then(data => setResume(data?.url ? data : null))
      .catch(() => setResume(null));
  }, []);

  const uploadResume = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setSuccess('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/admin/resume', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      setResume(data);
      setSuccess('Resume uploaded and published.');
    } catch (uploadError) {
      setError(uploadError.message || 'Unable to upload resume.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-white font-black text-3xl tracking-tight mb-1">Resume</h1>
        <p className="text-white/30 text-sm">Upload or replace the PDF shown by View Resume.</p>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-5 md:p-8">
        {resume && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b1a]/10 text-[#ff6b1a] flex items-center justify-center shrink-0">
                <FiFileText size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{resume.filename || 'resume.pdf'}</p>
                {resume.uploadedAt && (
                  <p className="text-white/30 text-xs mt-1">
                    Uploaded {new Date(resume.uploadedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors text-xs"
            >
              <FiExternalLink size={14} />
              View Resume
            </a>
          </div>
        )}

        <input
          ref={fileRef}
          id="resume-upload"
          type="file"
          accept="application/pdf,.pdf"
          onChange={uploadResume}
          className="hidden"
        />
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
            {uploading ? 'Uploading...' : resume ? 'Replace Resume PDF' : 'Upload Resume PDF'}
          </span>
          <span className="text-[10px] text-white/20">PDF only · Maximum 10 MB</span>
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
