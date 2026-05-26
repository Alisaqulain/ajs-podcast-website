import { ObjectId } from "mongodb";

export interface Contact {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredDateTime?: string;
  source?: string;
  createdAt: Date;
  read?: boolean;
}

export type ContactInput = Omit<Contact, "_id" | "createdAt" | "read">;
