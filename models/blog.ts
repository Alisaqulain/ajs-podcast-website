import { ObjectId } from "mongodb";
import type { ContentStatus } from "@/lib/cms";

export interface Blog {
  _id?: ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  /** @deprecated Alias for featuredImage */
  coverImage: string;
  featuredImage: string;
  videoUrl: string;
  status: ContentStatus;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogInput = Omit<Blog, "_id" | "createdAt" | "updatedAt"> & {
  createdAt?: Date;
  updatedAt?: Date;
};
