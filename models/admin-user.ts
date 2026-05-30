import { ObjectId } from "mongodb";

/** Reserved for future multi-admin support; login uses ADMIN_EMAIL / ADMIN_PASSWORD env. */
export interface AdminUser {
  _id?: ObjectId;
  email: string;
  name: string;
  createdAt: Date;
}
