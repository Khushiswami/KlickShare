// src/app/dashboard/user/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar';  // Adjust if your tsconfig or alias is different

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}
