import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import { getSeedPodcastApiRows } from "./podcasts-seed";
import { serializeDocument, serializeDocuments } from "./serialize";
import { publishedFilterForPublic } from "./cms-content";

export async function listPodcasts(limit?: number) {
  const db = await getDb();
  if (!db) {
    const rows = getSeedPodcastApiRows();
    const sliced = typeof limit === "number" && limit > 0 ? rows.slice(0, limit) : rows;
    return sliced.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      youtubeLink: p.youtubeLink,
      thumbnail: p.thumbnail,
      createdAt: p.createdAt,
    }));
  }
  const cur = db
    .collection("podcasts")
    .find({})
    .sort({ createdAt: -1 });
  if (limit) cur.limit(limit);
  const docs = await cur.toArray();
  return serializeDocuments(docs);
}

export async function getBlogBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const doc = await db.collection("blogs").findOne({
    slug,
    ...publishedFilterForPublic(),
  });
  return serializeDocument(doc);
}

export async function listBlogs(limit?: number, publishedOnly = true) {
  const db = await getDb();
  if (!db) return [];
  const filter = publishedOnly ? publishedFilterForPublic() : {};
  const cur = db.collection("blogs").find(filter).sort({ createdAt: -1 });
  if (limit) cur.limit(limit);
  return serializeDocuments(await cur.toArray());
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const doc = await db.collection("articles").findOne({
    slug,
    ...publishedFilterForPublic(),
  });
  return serializeDocument(doc);
}

export async function listArticles(limit?: number, publishedOnly = true) {
  const db = await getDb();
  if (!db) return [];
  const filter = publishedOnly ? publishedFilterForPublic() : {};
  const cur = db.collection("articles").find(filter).sort({ createdAt: -1 });
  if (limit) cur.limit(limit);
  return serializeDocuments(await cur.toArray());
}

export async function listTestimonials(publishedOnly = true) {
  const db = await getDb();
  if (!db) return [];
  const filter = publishedOnly ? publishedFilterForPublic() : {};
  const docs = await db
    .collection("testimonials")
    .find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .toArray();
  return serializeDocuments(docs);
}

export async function getPodcastById(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const doc = await db
    .collection("podcasts")
    .findOne({ _id: new ObjectId(id) });
  return serializeDocument(doc);
}

export async function getBlogById(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const doc = await db.collection("blogs").findOne({ _id: new ObjectId(id) });
  return serializeDocument(doc);
}

export async function getArticleById(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const doc = await db.collection("articles").findOne({ _id: new ObjectId(id) });
  return serializeDocument(doc);
}
