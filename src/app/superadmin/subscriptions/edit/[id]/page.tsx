"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditSubscriptionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [plan, setPlan] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<"active" | "expired" | "cancelled">("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscription() {
      try {
        setLoading(true);
        const res = await fetch(`/api/subscriptions/${id}`);
        if (!res.ok) throw new Error("Failed to fetch subscription");
        const data = await res.json();
        setPlan(data.plan);
        setStartDate(data.startDate.slice(0, 10));
        setEndDate(data.endDate.slice(0, 10));
        setStatus(data.status);
      } catch (err: any) {
        setError(err.message || "Error loading subscription");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchSubscription();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, startDate, endDate, status }),
      });

      if (!res.ok) throw new Error("Failed to update subscription");
      router.push("/superadmin/subscriptions");
    } catch (err: any) {
      setError(err.message || "Error updating subscription");
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      const res = await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subscription");
      router.push("/superadmin/subscriptions");
    } catch (err: any) {
      setError(err.message || "Error deleting subscription");
    }
  }

  return (
    <AdminProtected>
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Subscription</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1">Plan</label>
              <input
                type="text"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "expired" | "cancelled")}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminProtected>
  );
}
