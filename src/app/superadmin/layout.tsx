"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/auth";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  function handleLogout() {
    logoutAdmin();
    router.push("/superadmin/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <Link href="/superadmin/dashboard" className="block hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/superadmin/photographers" className="block hover:text-blue-400">
            Manage Photographers
          </Link>
          <Link href="/superadmin/users" className="block hover:text-blue-400">
            Manage Users
          </Link>
          <Link href="/superadmin/groups" className="block hover:text-blue-400">
            Manage Groups
          </Link>
          <Link href="/superadmin/subscriptions" className="block hover:text-blue-400">
            Manage Subscriptions
          </Link>
          <Link href="/superadmin/transactions" className="block hover:text-blue-400">
            Manage Transactions
          </Link>

        </nav>
        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
