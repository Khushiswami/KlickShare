"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Case Studies / Solutions", href: "" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} max-w-7xl mx-auto px-6 py-4 flex items-center justify-between`}>
        {/* Left Section: Logo + Nav Links */}
        <div className="flex items-center space-x-10">
          {/* Logo */}
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/logo.svg"
              alt="Klickshare Logo"
              width={80}
              height={70}
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className={`${styles.navLinks} hidden md:flex`}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.authSection}>
          <button className={styles.tryNow}>Try Now</button>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.menuToggle} md:hidden ml-4`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Background Overlay when menu open */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)}></div>}
    </header>
  );
}
