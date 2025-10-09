import Sidebar from "@/components/Sidebar";

const photographerLinks = [
  { name: "Home", path: "/dashboard/photographer" },
  { name: "My Bookings", path: "/dashboard/photographer/bookings" },
  { name: "Upload Photos", path: "/dashboard/photographer/upload" },
  { name: "Orders", path: "/dashboard/photographer/orders" },
  { name: "Settings", path: "/dashboard/photographer/settings" },
];

export default function PhotographerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar title="Photographer Dashboard" links={photographerLinks} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}