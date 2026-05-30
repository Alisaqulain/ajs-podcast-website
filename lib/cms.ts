/** Mongo filter: published posts (legacy rows without `status` count as published). */
export const PUBLISHED_CONTENT_FILTER = {
  $or: [{ status: "published" }, { status: { $exists: false } }],
};

export type ContentStatus = "draft" | "published";

export const CONTENT_STATUSES: ContentStatus[] = ["draft", "published"];

export type BookingWorkflowStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "cancelled";

export const BOOKING_WORKFLOW_STATUSES: BookingWorkflowStatus[] = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
];
