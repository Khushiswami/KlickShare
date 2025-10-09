// // src/app/dashboard/user/layout.tsx
// import React from 'react';
// import Sidebar from '@/components/Sidebar';  // Adjust if your tsconfig or alias is different

// export default function UserLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <Sidebar />
//       <main style={{ marginLeft: '250px', padding: '20px' }}>
//         {children}
//       </main>
//     </div>
//   );
// }


// src/app/dashboard/user/layout.tsx
import React from "react";
import Sidebar from "@/components/Sidebar";
import { FaUser, FaCog, FaHome } from "react-icons/fa";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const sidebarLinks = [
    { name: "Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Profile", path: "/dashboard/user/profile", icon: <FaUser /> },
    { name: "Settings", path: "/dashboard/user/settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex">
      <Sidebar title="User Panel" links={sidebarLinks} />
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
