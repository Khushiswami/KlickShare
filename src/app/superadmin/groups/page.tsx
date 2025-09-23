"use client";

import { useState, useEffect } from "react";
import AdminProtected from "@/components/AdminProtected";

interface Group {
  _id: string;
  name: string;
  members: number;
  status: "active" | "inactive";
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newMembers, setNewMembers] = useState<number>(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch groups
  useEffect(() => {
    fetchGroups();
  }, []);

  async function fetchGroups() {
    try {
      setLoading(true);
      const res = await fetch("/api/groups");
      if (!res.ok) throw new Error("Failed to fetch groups");
      const data = await res.json();
      setGroups(data);
    } catch (err: any) {
      setError(err.message || "Error loading groups");
    } finally {
      setLoading(false);
    }
  }

  async function addGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || newMembers <= 0) return;

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          members: newMembers,
          status: "active",
        }),
      });

      if (!res.ok) throw new Error("Failed to add group");
      const data = await res.json();
      setGroups((prev) => [...prev, data]);
      setNewName("");
      setNewMembers(0);
    } catch (err: any) {
      setError(err.message || "Error adding group");
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    try {
      const res = await fetch(`/api/groups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: currentStatus === "active" ? "inactive" : "active",
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();

      setGroups((prev) =>
        prev.map((g) => (g._id === id ? updated : g))
      );
    } catch (err: any) {
      setError(err.message || "Error updating status");
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(groups.length / pageSize);
  const currentGroups = groups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  

  return (
    <AdminProtected>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-black">Manage Groups</h1>

        {/* Add New Group */}
        <form onSubmit={addGroup} className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Group Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-3 py-2 border rounded w-1/3 text-black"
          />

          <input
            type="number"
            placeholder="Members"
            value={newMembers}
            onChange={(e) => setNewMembers(Number(e.target.value))}
            className="px-3 py-2 border rounded w-1/3 text-black"
          />
                                             
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Group
          </button>
        </form>

        {loading ? (
          <p>Loading groups...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {/* Groups Table */}
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg text-black">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Group Name</th>
                  <th className="p-3">Members</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentGroups.map((g) => (
                  <tr key={g._id} className="border-t hover:bg-gray-50 text-black">
                    <td className="p-3">{g._id}</td>
                    <td className="p-3">{g.name}</td>
                    <td className="p-3">{g.members}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          g.status === "active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-3">
                      {/* Edit Link */}
                      <a
                        href={`/superadmin/groups/edit/${g._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                      {/* Activate/Deactivate */}
                      <button
                        onClick={() => toggleStatus(g._id, g.status)}
                        className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
                      >
                        {g.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
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
