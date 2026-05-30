import { ObjectId } from "mongodb";
import type { BookingWorkflowStatus } from "@/lib/cms";

export type BookingPaymentStatus = "pending" | "paid" | "failed";

export interface Booking {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  /** Guest notes / message */
  message: string;
  /** @deprecated Alias for message */
  topic: string;
  packageId: ObjectId;
  packageTitle: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm 24h */
  time: string;
  /** Admin workflow status */
  status: BookingWorkflowStatus;
  amount: number;
  paymentStatus: BookingPaymentStatus;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  createdAt: Date;
  updatedAt: Date;
}
