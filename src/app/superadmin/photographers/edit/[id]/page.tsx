

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditPhotographer() {
  const params = useParams();
  const router = useRouter();
  const id = (params as { id?: string })?.id || "";

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("inactive");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/photographers/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.data) {
          setName(j.data.name || "");
          setCompanyName(j.data.companyName || "");
          setMobileNumber(j.data.mobileNumber || "");
          setStatus(j.data.status || "inactive");
        } else {
          alert("Photographer not found");
          router.push("/superadmin/photographers");
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
      const res = await fetch(`/api/photographers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, companyName, mobileNumber, status }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Update failed");
      }
      alert("Updated successfully");
      router.push("/superadmin/photographers");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update");
    }
  }

  return (
    <AdminProtected>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4 text-black">Edit Photographer</h1>

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
              <label className="block mb-1 text-black">Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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

            <div>
              <label className="block mb-1 text-black">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                className="w-full px-3 py-2 border rounded text-black"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-between text-black">
              <button
                type="button"
                onClick={() => router.push("/superadmin/photographers")}
                className="px-4 py-2 border rounded bg-red-600 text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded "
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
