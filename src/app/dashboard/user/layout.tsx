import Sidebar from "@/components/Sidebar";
import { FaUser, FaHeart, FaImages, FaUsers, FaRegEye } from "react-icons/fa";

const userLinks = [
  { name: "View Profile", path: "/dashboard/user", icon: <FaUser /> },
  { name: "View Favourite", path: "/dashboard/user/favourite", icon: <FaHeart /> },
  { name: "View Gallery", path: "/dashboard/user/gallery", icon: <FaImages /> },
  { name: "Join Group", path: "/dashboard/user/join-group", icon: <FaUsers /> },
  { name: "View Group", path: "/dashboard/user/view-group", icon: <FaRegEye /> },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar title="" links={userLinks} />
      <main style={{ marginLeft: "200px", padding: "0px", marginTop: "90px" }}>{children}</main>
    </>
  );
}