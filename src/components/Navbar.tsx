"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Case Studies/ Solutions", href: "" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link href="/" className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Klickshare Logo"
            width={80}
            height={70}
            className={styles.logoImage}
          />
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={styles.menuIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav Links */}
        <div
          className={`${menuOpen ? styles.navLinksOpen : styles.navLinks} lg:flex`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${styles.navLink} ${pathname === link.href ? styles.activeLink : ""
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Sign Up button for mobile (inside menu) */}
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className={`${styles.signupBtn} ${styles.mobileOnly}`}
          >
            Sign Up / Login
          </Link>
        </div>

        {/* Sign Up button for desktop (outside menu) */}
        <Link
          href="/signup"
          onClick={() => setMenuOpen(false)}
          className={`${styles.signupBtn} ${styles.desktopOnly}`}
        >
          Sign Up / Login
        </Link>
      </nav>
    </header>
  );
}
