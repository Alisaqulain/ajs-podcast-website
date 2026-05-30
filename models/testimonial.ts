import { ObjectId } from "mongodb";
import type { ContentStatus } from "@/lib/cms";

export interface Testimonial {
  _id?: ObjectId;
  /** Person or brand name */
  name: string;
  title: string;
  slug: string;
  shortDescription: string;
  /** Rich HTML body */
  content: string;
  /** @deprecated Use featuredImage */
  message: string;
  /** @deprecated Use featuredImage */
  image: string;
  featuredImage: string;
  videoUrl: string;
  status: ContentStatus;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TestimonialInput = Omit<
  Testimonial,
  "_id" | "createdAt" | "updatedAt"
> & {
  createdAt?: Date;
  updatedAt?: Date;
};
