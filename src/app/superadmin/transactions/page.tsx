"use client";

import { useState, useEffect } from "react";
import AdminProtected from "@/components/AdminProtected";

interface Transaction {
  _id: string;
  user: { _id: string; name: string; email: string };
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch from API
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message || "Error loading transactions");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  // Filter + paginate
  const filtered = transactions.filter(
    (t) => filterStatus === "all" || t.status === filterStatus
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentTransactions = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // CSV Download
  function downloadCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,User,Email,Amount,Status,Date"]
        .concat(
          currentTransactions.map(
            (t) =>
              `${t._id},${t.user?.name || "N/A"},${t.user?.email || ""},${
                t.amount
              },${t.status},${new Date(t.date).toLocaleDateString()}`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <AdminProtected>
      <div className="max-w-6xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-6 text-black">Manage Transactions</h1>

        {/* Filter & Download */}
        <div className="mb-4 flex gap-4 text-black">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded text-blsck"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download CSV
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left text-black">
                <th className="p-3">ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Amount ($)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((t) => (
                <tr key={t._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{t._id}</td>
                  <td className="p-3">
                    {t.user?.name || "N/A"}
                    <br />
                    <span className="text-sm text-gray-500">
                      {t.user?.email}
                    </span>
                  </td>
                  <td className="p-3">{t.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        t.status === "success"
                          ? "bg-green-200 text-green-800"
                          : t.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2 text-black">
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminProtected>
  );
}
