"use client";

import { useRef, useState } from "react";

export default function CoverPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function selectFile(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Use JPG, PNG or WebP.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Cover must be smaller than 8 MB.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/covers", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="cover-picker">
      <div className="cover-preview">
        {value ? <img src={value} alt="Book cover preview" /> : <div className="cover-empty">No cover</div>}
      </div>
      <div className="cover-picker-actions">
        <button type="button" className="btn" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Uploading..." : value ? "Change cover" : "Choose cover"}
        </button>
        {value && <button type="button" className="text-button" onClick={() => onChange("")} disabled={busy}>Remove</button>}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => selectFile(e.target.files?.[0])} />
      <div className="field-hint">JPG, PNG or WebP · max 8 MB</div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
