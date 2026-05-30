"use client";

import { useState } from "react";
import { Loader2, Upload, Film } from "lucide-react";
import { parseApiJson } from "@/lib/parse-api-response";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export function VideoField({ label, value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload/video", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const parsed = await parseApiJson<{ url?: string; error?: string }>(res);
      if (!parsed.ok) {
        setErr(parsed.error);
        return;
      }
      const data = parsed.data;
      if (!res.ok) {
        setErr(data.error || `Upload failed (HTTP ${res.status})`);
        return;
      }
      if (data.url) onChange(data.url);
      else setErr("Upload succeeded but no URL was returned.");
    } catch (cause) {
      setErr(
        cause instanceof Error
          ? cause.message
          : "Network error during upload."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="text-sm font-medium text-brand-dark">{label}</label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /uploads/videos/…"
          className="w-full flex-1 rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
        />
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-brand-gold/25 bg-brand-dark px-4 py-2.5 text-sm font-medium text-brand-cream hover:bg-brand-dark/90">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload video
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
            className="hidden"
            onChange={onFile}
          />
        </label>
      </div>
      {err ? <p className="mt-1 text-xs text-red-600">{err}</p> : null}
      {value.trim() ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-brand-gold/20 bg-white/80 p-3">
          <Film className="mt-1 h-5 w-5 shrink-0 text-brand-gold-deep" />
          <video
            src={value.trim()}
            controls
            className="max-h-48 w-full max-w-md rounded-xl"
          />
        </div>
      ) : null}
    </div>
  );
}
