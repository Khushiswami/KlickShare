import AdminProtected from "@/components/AdminProtected";

export default function AdminDashboard() {
  return (
    <AdminProtected>
      <div>
        <h1 className="text-3xl font-bold mb-6 text-black">Super Admin Dashboard</h1>
        <p className="text-black">
          Welcome to the Klickshare Super Admin Panel.  
          Use the sidebar to manage photographers, groups, subscriptions, and transactions.
        </p>
      </div>
    </AdminProtected>
  );
}
