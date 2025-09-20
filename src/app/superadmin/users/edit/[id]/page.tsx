"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditUser() {
  const params = useParams();
  const router = useRouter();
  const id = (params as { id?: string })?.id || "";

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.data) {
          setName(j.data.name || "");
          setMobileNumber(j.data.mobileNumber || "");
        } else {
          alert("User not found");
          router.push("/superadmin/users");
        }
      })
      .catch((e) => {
        console.error(e);
        alert("Failed to load");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), mobileNumber: mobileNumber.trim() }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Update failed");
      }
      alert("Updated successfully");
      router.push("/superadmin/users");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update");
    }
  }

  return (
    <AdminProtected>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-black">Edit User</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-black">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-black">Mobile Number</label>
              <input
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>

            <div className="flex justify-between text-black">
              <button
                type="button"
                onClick={() => router.push("/superadmin/users")}
                className="px-4 py-2 border rounded bg-red-600 text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminProtected>
  );
}
