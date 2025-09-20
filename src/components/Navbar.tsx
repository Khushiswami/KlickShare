"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-black">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black-600">
          Klick<span className="text-blue-600">share</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}