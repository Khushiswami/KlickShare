"use client";

import { useEffect, useState } from "react";
import AdminProtected from "@/components/AdminProtected";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  mobileNumber: string;
  status: "active" | "inactive";
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Fetch users with pagination
  async function fetchData(page = 1) {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?page=${page}&limit=${pageSize}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const json = await res.json();
      setUsers(json.data || []);
      setTotal(json.total || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  // Add new user
  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !newMobile.trim()) return alert("Please fill name and mobile");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), mobileNumber: newMobile.trim(), otp: "123456" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Failed to create user");
      }

      setNewName("");
      setNewMobile("");

      // Go to last page to show newly added user
      const newTotal = total + 1;
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize));
      fetchData(lastPage);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to add user");
    }
  }

  // Toggle active/inactive status
  async function toggleStatus(id: string) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleStatus" }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchData(currentPage);
    } catch (err) {
      console.error(err);
      alert("Failed to toggle status");
    }
  }

  // Delete user
  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      const newTotal = Math.max(0, total - 1);
      const lastPage = Math.max(1, Math.ceil(newTotal / pageSize));
      const nextPage = Math.min(currentPage, lastPage);
      fetchData(nextPage);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <AdminProtected>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-black">Manage Users</h1>

        {/* Add New User */}
        <form onSubmit={addUser} className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add User
          </button>
        </form>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {/* Users Table */}
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg text-black">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t hover:bg-gray-50 text-black">
                    <td className="p-3">{u._id}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.mobileNumber}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          u.status === "active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-3">
                      {/* Edit */}
                      <a
                        href={`/superadmin/users/edit/${u._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                      {/* Activate/Deactivate */}
                      <button
                        onClick={() => toggleStatus(u._id)}
                        className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
                      >
                        {u.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500 text-black">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
