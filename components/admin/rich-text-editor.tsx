"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImageIcon,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Video,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({
        placeholder:
          "Write with headings, lists, links, images, videos, quotes, and alignment…",
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] max-w-none rounded-xl border border-brand-gold/15 bg-white/90 px-4 py-3 text-sm text-brand-dark outline-none focus:ring-2 focus:ring-brand-gold/30 prose-blog",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (next !== current) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[280px] animate-pulse rounded-xl bg-brand-cream/80" />
    );
  }

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function uploadImage() {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp,image/jpg";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        window.alert(data.error || "Image upload failed");
      }
    };
    input.click();
  }

  function embedVideo() {
    if (!editor) return;
    const url = window.prompt(
      "YouTube URL or direct video URL (mp4/webm)",
      "https://"
    );
    if (!url?.trim()) return;
    const u = url.trim();
    if (u.includes("youtube.com") || u.includes("youtu.be")) {
      editor.chain().focus().setYoutubeVideo({ src: u }).run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent(
          `<video src="${u}" controls playsinline class="max-w-full rounded-xl"></video>`
        )
        .run();
    }
  }

  const btn =
    "rounded-lg border border-brand-gold/20 bg-white/80 p-2 text-brand-dark hover:bg-brand-gold/10 disabled:opacity-40";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 rounded-xl border border-brand-gold/15 bg-white/60 p-2">
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button type="button" className={btn} onClick={setLink} aria-label="Link">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => void uploadImage()}
          aria-label="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={embedVideo}
          aria-label="Video"
        >
          <Video className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          aria-label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          aria-label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          aria-label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Spacing rule"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
