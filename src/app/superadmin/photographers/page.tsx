"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";

type Photographer = {
  _id: string;
  name: string;
  companyName: string;
  mobileNumber: string;
  status: "active" | "inactive";
};

export default function PhotographersPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newMobile, setNewMobile] = useState("");

  async function fetchData(page = 1) {

    if (page < 1) page = 1;
    setLoading(true);
    try {
      const res = await fetch(`/api/photographers?page=${page}&limit=${pageSize}`);
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Fetch error:", err);
        throw new Error("Failed to fetch photographers");
      }
      const json = await res.json();
      const arr: Photographer[] = json.data || [];
      setPhotographers(arr);
      setTotal(json.total ?? 0);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      alert("Failed to load photographers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  async function addPhotographer(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newCompany.trim() || !newMobile.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/photographers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          companyName: newCompany.trim(),
          mobileNumber: newMobile.trim(),
          email: `${newMobile.trim()}@example.com`,
          otp: "123456",
          status: "active",
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.error || "Failed to add photographer");
      }
      setNewName("");
      setNewCompany("");
      setNewMobile("");

      const newTotal = total + 1;
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize));
      await fetchData(lastPage);
    } catch (err: any) {
      console.error("Add error:", err);
      alert(err.message || "Failed to add photographer");
    }
  }

  async function toggleStatus(id: string) {
    try {
      const res = await fetch(`/api/photographers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "" },
        body: JSON.stringify({ action: "toggleStatus" }),
      });
      
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        console.error("Toggle error body:", errBody);
        throw new Error("Failed to update status");
      }

      await fetchData(currentPage);
    } catch (err) {
      console.error("toggleStatus error:", err);
      alert("Failed to toggle status");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photographer?")) return;
    try {
      const res = await fetch(`/api/photographers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        console.error("Delete error body:", errBody);
        throw new Error("Failed to delete");
      }
      const newTotal = Math.max(0, total - 1);
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize));
      const nextPage = Math.min(currentPage, lastPage);
      await fetchData(nextPage);
    } catch (err) {
      console.error("handleDelete error:", err);
      alert("Failed to delete");
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <AdminProtected>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-black">Manage Photographers</h1>

        {/* Add New Photographer */}
        <form onSubmit={addPhotographer} className="mb-6 flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
          <input
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            placeholder="Company Name"
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
          <input
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            placeholder="Mobile Number"
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Photographer
          </button>
        </form>

        {loading ? (
          <p>Loading photographers...</p>
        ) : (
          <>
            {/* Table */}
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg text-black">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">S No.</th>
                  <th className="p-3">Photographer ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Company Name</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {photographers.map((p, idx) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50 text-black">
                    <td className="p-3">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="p-3">{p._id.slice(0, 8)}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.companyName}</td>
                    <td className="p-3">{p.mobileNumber}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${p.status === "active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                          }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col space-y-2">
                        <Link
                          href={`/superadmin/photographers/edit/${p._id}`}
                          className="text-blue-600 hover:underline w-28 text-center"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => toggleStatus(p._id)}
                          className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 w-28"
                        >
                          {p.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-28"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => fetchData(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => fetchData(i + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => fetchData(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminProtected>
  );
}