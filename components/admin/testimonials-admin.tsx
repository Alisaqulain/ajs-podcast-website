"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageField } from "@/components/admin/image-field";
import { VideoField } from "@/components/admin/video-field";
import { CONTENT_STATUSES } from "@/lib/cms";

const schema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  shortDescription: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  videoUrl: z.string().optional(),
  status: z.enum(["draft", "published"]),
  rating: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
type Row = FormValues & { _id: string };

export function TestimonialsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      title: "",
      shortDescription: "",
      content: "<p></p>",
      featuredImage: "",
      videoUrl: "",
      status: "published",
      rating: "",
    },
  });

  const content = watch("content");
  const featuredImage = watch("featuredImage");

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    const data = (await res.json()) as Row[];
    setItems(
      Array.isArray(data)
        ? data.map((r) => ({
            ...r,
            content: r.content || (r as { message?: string }).message || "",
            featuredImage:
              r.featuredImage || (r as { image?: string }).image || "",
            status: (r.status as FormValues["status"]) || "published",
          }))
        : []
    );
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  function startCreate() {
    setEditingId(null);
    reset({
      name: "",
      title: "",
      shortDescription: "",
      content: "<p></p>",
      featuredImage: "",
      videoUrl: "",
      status: "published",
      rating: "",
    });
  }

  function startEdit(r: Row) {
    setEditingId(r._id);
    reset({
      name: r.name,
      title: r.title || "",
      shortDescription: r.shortDescription || "",
      content: r.content || "<p></p>",
      featuredImage: r.featuredImage || "",
      videoUrl: r.videoUrl || "",
      status: r.status || "published",
      rating: r.rating != null ? String(r.rating) : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(values: FormValues) {
    const ratingVal = values.rating?.trim();
    const payload: Record<string, unknown> = {
      ...values,
      message: values.content,
      image: values.featuredImage,
    };
    if (ratingVal) {
      const r = Number(ratingVal);
      if (Number.isFinite(r) && r >= 1 && r <= 5) payload.rating = Math.round(r);
    } else {
      payload.rating = null;
    }

    if (editingId) {
      await fetch(`/api/testimonials/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    await refresh();
    startCreate();
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await refresh();
    if (editingId === id) startCreate();
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-dark">
            Testimonials
          </h1>
          <p className="text-sm text-brand-dark/60">
            Rich testimonials with images, video, and publish control.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-cream"
        >
          <Plus className="h-4 w-4" />
          New
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-3xl border border-brand-gold/15 bg-white/70 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold text-brand-dark">
          {editingId ? "Edit" : "Create"}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-brand-dark">Name</label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm"
              {...register("name")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark">
              Title / role
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm"
              {...register("title")}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-brand-dark">
              Short description
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm"
              {...register("shortDescription")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark">Status</label>
            <select
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm"
              {...register("status")}
            >
              {CONTENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "published" ? "Published" : "Draft"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark">
              Rating (1–5)
            </label>
            <input
              type="number"
              min={1}
              max={5}
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm"
              {...register("rating")}
            />
          </div>
          <div className="md:col-span-2">
            <ImageField
              label="Photo"
              value={featuredImage || ""}
              onChange={(url) => setValue("featuredImage", url)}
            />
          </div>
          <div className="md:col-span-2">
            <VideoField
              label="Video (optional)"
              value={watch("videoUrl") || ""}
              onChange={(url) => setValue("videoUrl", url)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-brand-dark">Story</label>
            <div className="mt-2">
              <RichTextEditor
                value={content || ""}
                onChange={(html) => setValue("content", html)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-2xl bg-gold-gradient px-6 py-2.5 text-sm font-semibold text-brand-dark disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save
        </button>
      </form>

      <div className="overflow-x-auto rounded-3xl border border-brand-gold/15 bg-white/60">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-brand-gold/10 text-xs uppercase text-brand-dark/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8">
                  No testimonials yet.
                </td>
              </tr>
            ) : (
              items.map((r) => (
                <tr key={r._id} className="border-b border-brand-gold/5">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 capitalize">{r.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => startEdit(r)}
                      className="mr-2 inline-flex items-center gap-1 rounded-xl border px-2 py-1 text-xs"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(r._id)}
                      className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
