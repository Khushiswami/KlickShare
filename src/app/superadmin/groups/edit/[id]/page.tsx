"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditGroupPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [members, setMembers] = useState<number>(0);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch group by ID
  useEffect(() => {
    async function fetchGroup() {
      try {
        setLoading(true);
        const res = await fetch(`/api/groups/${id}`);
        if (!res.ok) throw new Error("Failed to fetch group");
        const data = await res.json();
        setName(data.name);
        setMembers(data.members);
        setStatus(data.status);
      } catch (err: any) {
        setError(err.message || "Error loading group");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchGroup();
  }, [id]);

  // Handle Update
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/groups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, members, status }),
      });

      if (!res.ok) throw new Error("Failed to update group");
      router.push("/superadmin/groups");
    } catch (err: any) {
      setError(err.message || "Error updating group");
    }
  }

  // Handle Delete
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this group?")) return;

    try {
      const res = await fetch(`/api/groups/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete group");

      router.push("/superadmin/groups");
    } catch (err: any) {
      setError(err.message || "Error deleting group");
    }
  }

  return (
    <AdminProtected>
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-black">Edit Group</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1 text-black">Group Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-black">Members</label>
              <input
                type="number"
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-black">Status</label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "active" | "inactive")
                }
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-between items-center mt-6">
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
                Delete Group
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminProtected>
  );
}
