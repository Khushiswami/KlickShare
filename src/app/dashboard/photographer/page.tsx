"use client";

import { useEffect, useState } from "react";

export default function PhotographerDashboard() {
  const [photographer, setPhotographer] = useState<{
    name: string;
    companyName: string;
    mobileNumber: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // For demo, fetch the latest photographer
    // In a real app, fetch logged-in photographer using auth/session
    async function fetchPhotographer() {
      try {
        const res = await fetch("/api/photographers?page=1&limit=1");
        if (!res.ok) throw new Error("Failed to fetch photographer");
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setPhotographer(json.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPhotographer();
  }, []);

  if (!photographer) return <div className="p-6 text-black">Loading dashboard...</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Welcome, {photographer.name}!
      </h1>
      <p className="text-black mb-2">Company: {photographer.companyName}</p>
      <p className="text-black mb-2">Mobile: {photographer.mobileNumber}</p>
      <p className="text-black mb-2">Email: {photographer.email}</p>
      <p className="text-black">This is your photographer dashboard.</p>

      <p className="text-black">business profile setting</p>
      <p className="text-black">Storage utilization</p>

    </div>
  );
}
