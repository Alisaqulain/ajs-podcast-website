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
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  videoUrl: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type ContentRow = FormValues & { _id: string; createdAt?: string; updatedAt?: string };

type Props = {
  apiBase: "/api/articles" | "/api/blogs";
  title: string;
  description: string;
  publicPath: "/articles" | "/blog";
};

export function ContentCmsAdmin({ apiBase, title, description, publicPath }: Props) {
  const [items, setItems] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

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
      title: "",
      shortDescription: "",
      content: "<p></p>",
      featuredImage: "",
      videoUrl: "",
      slug: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
    },
  });

  const content = watch("content");
  const featuredImage = watch("featuredImage");
  const status = watch("status");

  async function refresh() {
    setLoading(true);
    const q = search.trim() ? `?q=${encodeURIComponent(search.trim())}` : "";
    const res = await fetch(`${apiBase}${q}`);
    const data = (await res.json()) as ContentRow[];
    setItems(
      Array.isArray(data)
        ? data.map((row) => ({
            ...row,
            featuredImage:
              row.featuredImage ||
              (row as { coverImage?: string }).coverImage ||
              "",
            status: (row.status as FormValues["status"]) || "published",
          }))
        : []
    );
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startCreate() {
    setEditingId(null);
    reset({
      title: "",
      shortDescription: "",
      content: "<p></p>",
      featuredImage: "",
      videoUrl: "",
      slug: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
    });
  }

  function startEdit(row: ContentRow) {
    setEditingId(row._id);
    reset({
      title: row.title,
      shortDescription: row.shortDescription || "",
      content: row.content || "<p></p>",
      featuredImage:
        row.featuredImage ||
        (row as { coverImage?: string }).coverImage ||
        "",
      videoUrl: row.videoUrl || "",
      slug: row.slug || "",
      status: row.status || "published",
      seoTitle: row.seoTitle || "",
      seoDescription: row.seoDescription || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      ...values,
      coverImage: values.featuredImage,
      slug: values.slug?.trim() || undefined,
      seoTitle: values.seoTitle?.trim() || undefined,
      seoDescription: values.seoDescription?.trim() || undefined,
    };

    const res = await fetch(
      editingId ? `${apiBase}/${editingId}` : apiBase,
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      setToast({ type: "err", text: err.error || "Save failed" });
      return;
    }

    setToast({ type: "ok", text: editingId ? "Saved." : "Created." });
    await refresh();
    startCreate();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    setToast({ type: "ok", text: "Deleted." });
    await refresh();
    if (editingId === id) startCreate();
  }

  async function togglePublish(row: ContentRow) {
    const next = row.status === "published" ? "draft" : "published";
    await fetch(`${apiBase}/${row._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    await refresh();
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-dark">
            {title}
          </h1>
          <p className="text-sm text-brand-dark/60">{description}</p>
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

      {toast ? (
        <p
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            toast.type === "ok"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-red-200 bg-red-50 text-red-800"
          )}
        >
          {toast.text}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-3xl border border-brand-gold/15 bg-white/70 p-6 shadow-sm"
      >
        <p className="text-sm font-semibold text-brand-dark">
          {editingId ? "Edit" : "Create"}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-brand-dark">Title</label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
              {...register("title")}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-brand-dark">
              Short description
            </label>
            <textarea
              rows={2}
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
              {...register("shortDescription")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark">Slug</label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
              placeholder="auto from title"
              {...register("slug")}
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
            <label className="text-sm font-medium text-brand-dark">SEO title</label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
              {...register("seoTitle")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-brand-dark">
              SEO description
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-brand-gold/20 bg-white px-4 py-2.5 text-sm outline-none ring-brand-gold/30 focus:ring-2"
              {...register("seoDescription")}
            />
          </div>
          <div className="md:col-span-2">
            <ImageField
              label="Featured image"
              value={featuredImage || ""}
              onChange={(url) => setValue("featuredImage", url)}
            />
          </div>
          <div className="md:col-span-2">
            <VideoField
              label="Featured video (optional)"
              value={watch("videoUrl") || ""}
              onChange={(url) => setValue("videoUrl", url)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-brand-dark">Content</label>
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
          {status === "published" ? "Save & publish" : "Save draft"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3 rounded-3xl border border-brand-gold/15 bg-white/70 p-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title or description…"
          className="min-w-[200px] flex-1 rounded-2xl border border-brand-gold/20 bg-white px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-2xl bg-brand-dark px-4 py-2 text-sm font-medium text-brand-cream"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-brand-gold/15 bg-white/60">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-brand-gold/10 text-xs uppercase tracking-wide text-brand-dark/50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-brand-dark/60">
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-brand-dark/60">
                  No items yet.
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row._id} className="border-b border-brand-gold/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-brand-dark">{row.title}</p>
                    <a
                      href={`${publicPath}/${row.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-gold-deep hover:underline"
                    >
                      /{row.slug}
                    </a>
                  </td>
                  <td className="px-4 py-3 capitalize">{row.status || "published"}</td>
                  <td className="px-4 py-3 text-brand-dark/60">
                    {row.updatedAt
                      ? new Date(row.updatedAt).toLocaleDateString()
                      : row.createdAt
                        ? new Date(row.createdAt).toLocaleDateString()
                        : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => void togglePublish(row)}
                        className="rounded-xl border border-brand-gold/25 px-2 py-1 text-xs font-medium"
                      >
                        {row.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(row)}
                        className="inline-flex items-center gap-1 rounded-xl border border-brand-gold/25 px-2 py-1 text-xs font-medium"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(row._id)}
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
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
