import { ObjectId } from "mongodb";
import type { ContentStatus } from "@/lib/cms";

export interface Article {
  _id?: ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  videoUrl: string;
  status: ContentStatus;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ArticleInput = Omit<Article, "_id" | "createdAt" | "updatedAt"> & {
  createdAt?: Date;
  updatedAt?: Date;
};
