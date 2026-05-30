import { ContentCmsAdmin } from "@/components/admin/content-cms-admin";

export function BlogsAdmin() {
  return (
    <ContentCmsAdmin
      apiBase="/api/blogs"
      title="Blogs"
      description="Long-form journal posts with rich text, images, videos, and publish control."
      publicPath="/blog"
    />
  );
}
