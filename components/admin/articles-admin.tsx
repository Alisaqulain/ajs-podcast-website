import { ContentCmsAdmin } from "@/components/admin/content-cms-admin";

export function ArticlesAdmin() {
  return (
    <ContentCmsAdmin
      apiBase="/api/articles"
      title="Articles"
      description="Standalone articles with rich content, media uploads, and draft/publish workflow."
      publicPath="/articles"
    />
  );
}
