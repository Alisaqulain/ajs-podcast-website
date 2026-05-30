"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { BOOKING_WORKFLOW_STATUSES } from "@/lib/cms";

type Row = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  message?: string;
  topic?: string;
  packageId: string;
  packageTitle: string;
  date: string;
  time: string;
  amount: number;
  status?: string;
  paymentStatus: string;
  createdAt?: string;
};

export function BookingsAdmin() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [search, setSearch] = useState("");

  async function refresh() {
    setLoading(true);
    const q = new URLSearchParams();
    if (from.trim()) q.set("from", from.trim());
    if (to.trim()) q.set("to", to.trim());
    if (workflowStatus.trim()) q.set("status", workflowStatus.trim());
    if (paymentStatus.trim()) q.set("paymentStatus", paymentStatus.trim());
    if (search.trim()) q.set("q", search.trim());
    const res = await fetch(`/api/bookings?${q.toString()}`);
    const data = (await res.json()) as Row[];
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this booking enquiry?")) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-brand-dark">
          Bookings
        </h1>
        <p className="mt-2 text-sm text-brand-dark/60">
          Enquiries from the booking page and Book Now popup share the same data.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-3xl border border-brand-gold/15 bg-white/70 p-4 shadow-sm">
        <div>
          <label className="text-xs font-medium text-brand-dark/70">Search</label>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email, phone…"
            className="mt-1 block min-w-[180px] rounded-xl border border-brand-gold/20 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/70">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block rounded-xl border border-brand-gold/20 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/70">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block rounded-xl border border-brand-gold/20 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/70">
            Workflow
          </label>
          <select
            value={workflowStatus}
            onChange={(e) => setWorkflowStatus(e.target.value)}
            className="mt-1 block rounded-xl border border-brand-gold/20 bg-white px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {BOOKING_WORKFLOW_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/70">Payment</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="mt-1 block rounded-xl border border-brand-gold/20 bg-white px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-2xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-brand-cream"
        >
          Apply filters
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-gold-deep" />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-brand-gold/25 bg-white/50 px-6 py-12 text-center text-sm text-brand-dark/55">
          No bookings match these filters.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-gold/12 bg-white/65 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gold/15 bg-brand-cream/50 text-xs uppercase tracking-wide text-brand-dark/55">
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gold/10">
              {items.map((r) => (
                <tr key={r._id} className="text-brand-dark/85">
                  <td className="whitespace-nowrap px-4 py-3">
                    {r.date}{" "}
                    <span className="text-brand-dark/50">{r.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-brand-dark">{r.name}</div>
                    <div className="text-xs text-brand-dark/55">{r.email}</div>
                    <div className="text-xs text-brand-dark/45">{r.phone}</div>
                  </td>
                  <td className="max-w-[160px] px-4 py-3">
                    <div className="truncate font-medium">{r.packageTitle}</div>
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-xs">
                    <p className="line-clamp-3">
                      {r.message || r.topic || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status || "new"}
                      onChange={(e) =>
                        void updateStatus(r._id, e.target.value)
                      }
                      className="rounded-lg border border-brand-gold/20 bg-white px-2 py-1 text-xs capitalize"
                    >
                      {BOOKING_WORKFLOW_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.paymentStatus === "paid"
                          ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900"
                          : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900"
                      }
                    >
                      {r.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => void remove(r._id)}
                      className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
