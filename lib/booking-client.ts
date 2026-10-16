import { SITE } from "@/lib/site";
import type { PackagePublic } from "@/components/booking/booking-experience";

export function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function formatSlotLabel(t: string) {
  const [h, m] = t.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function payablePaise(pkg: PackagePublic) {
  const base = Math.round(pkg.price);
  const d =
    pkg.discountPrice != null && pkg.discountPrice > 0
      ? Math.round(pkg.discountPrice)
      : null;
  if (d != null && d < base) return d;
  return base;
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function ymd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Razorpay script failed"))
      );
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Razorpay script failed"));
    document.body.appendChild(s);
  });
}

export async function startRazorpayCheckout(opts: {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  await loadRazorpayScript();
  if (!window.Razorpay) throw new Error("Checkout could not load.");

  const logoUrl = `${SITE.url.replace(/\/$/, "")}${SITE.logoSrc}`;

  const orderRes = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId: opts.bookingId }),
  });
  const orderJson = await orderRes.json().catch(() => ({}));
  if (!orderRes.ok) {
    throw new Error(
      typeof orderJson.error === "string"
        ? orderJson.error
        : "Could not start checkout."
    );
  }

  const {
    orderId,
    amount,
    currency,
    keyId,
    planTitle,
  }: {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    planTitle?: string;
  } = orderJson;

  return new Promise<void>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: keyId,
      amount,
      currency: currency || "INR",
      name: SITE.name,
      description: planTitle
        ? `${planTitle} — Studio Booking`
        : "Studio Booking",
      image: logoUrl,
      order_id: orderId,
      prefill: {
        name: opts.name.trim(),
        email: opts.email.trim(),
        contact: opts.phone.replace(/\D/g, "").slice(0, 15) || undefined,
      },
      theme: { color: "#0284C7" },
      handler: async (response) => {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: opts.bookingId,
            }),
          });
          const verifyJson = await verifyRes.json().catch(() => ({}));
          if (!verifyRes.ok) {
            throw new Error(
              typeof verifyJson.error === "string"
                ? verifyJson.error
                : "Verification failed."
            );
          }
          opts.onSuccess();
          resolve();
        } catch (e) {
          const msg =
            e instanceof Error ? e.message : "Payment verification failed.";
          opts.onError(msg);
          reject(e);
        }
      },
      modal: {
        ondismiss: () => resolve(),
      },
    });
    rzp.open();
  });
}

export type BookingFormValues = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  topic: string;
  dateStr: string;
  time: string;
};

export function validateBookingForm(
  values: BookingFormValues,
  packageId: string | null
): string | null {
  if (!packageId) return "Select a package first.";
  if (!values.name.trim() || !values.email.trim() || !values.phone.trim()) {
    return "Name, email, and phone are required.";
  }
  if (!values.businessName.trim() || !values.topic.trim()) {
    return "Business name and session topic are required.";
  }
  if (!values.dateStr || !values.time) {
    return "Choose a valid date (Wed/Fri) and time slot.";
  }
  return null;
}

export async function createBookingRequest(
  packageId: string,
  values: BookingFormValues
): Promise<{ bookingId: string }> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      packageId,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      businessName: values.businessName.trim(),
      topic: values.topic.trim(),
      date: values.dateStr,
      time: values.time,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : "Could not create booking."
    );
  }
  return { bookingId: data.bookingId as string };
}
