"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";

interface Subscription {
  _id: string;
  photographer: { _id: string; name: string; email: string };
  plan: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "cancelled";
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscriptions
  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        setLoading(true);
        const res = await fetch("/api/subscriptions");
        if (!res.ok) throw new Error("Failed to fetch subscriptions");
        const data = await res.json();
        setSubscriptions(data);
      } catch (err: any) {
        setError(err.message || "Error loading subscriptions");
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  // Delete subscription
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      const res = await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subscription");
      setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting subscription");
    }
  }


  return (
    <AdminProtected>
      <div className="max-w-5xl mx-auto bg-white p-6 shadow rounded text-black">
        <h1 className="text-2xl font-bold mb-4">Manage Subscriptions</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : subscriptions.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">Photographer</th>
                <th className="border p-2">Plan</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>  
              {subscriptions.map((sub) => (
                <tr key={sub._id}>
                  <td className="border p-2">
                    {sub.photographer?.name || "N/A"} <br />
                    <span className="text-sm text-gray-500">
                      {sub.photographer?.email}
                    </span>
                  </td>
                  <td className="border p-2">{sub.plan}</td>
                  <td className="border p-2">
                    {new Date(sub.startDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(sub.endDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 capitalize">{sub.status}</td>
                  <td className="border p-2 flex gap-2">
                    <Link
                      href={`/superadmin/subscriptions/edit/${sub._id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminProtected>
  );
}
