"use client";

import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState<{ name: string; mobileNumber: string } | null>(null);

  useEffect(() => {

    async function fetchUser() {
      try {
        const res = await fetch("/api/users?page=1&limit=1");
        if (!res.ok) throw new Error("Failed to fetch user");

        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setUser(json.data[0]);
        }        

      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, []);

  if (!user) return <div className="p-6 text-black">Loading dashboard...</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Welcome, {user.name}!</h1>
      <p className="text-black mb-2">Mobile Number: {user.mobileNumber}</p>
      <p className="text-black">This is your user dashboard.</p>
    </div>
  );
}
