"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const links = [
    { name: "Case Studies/ Solutions", href: "" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const dashboardPath =
    userType === "photographer" ? "/dashboard/photographer" : "/dashboard/user";

  // Fetch auth info on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/authcookies");
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
        if (data.isLoggedIn && data.user) {
          setUserName(data.user.name || null);
          setUserType(data.user.userType || null);
        }
      } catch {
        setIsLoggedIn(false);
        setUserName(null);
      }
    }
    checkAuth();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsLoggedIn(false);
      setUserName(null);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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

        {/* Mobile menu toggle */}
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
              className={`${styles.navLink} ${
                pathname === link.href ? styles.activeLink : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile-only dropdown menu (inside nav) */}
          <div className={`${styles.mobileOnly} mt-4`} ref={dropdownRef}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={styles.signupBtn}
                >
                  Hi, {userName || "Profile"}
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link
                      href={dashboardPath}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      Logout
                    </button>
                     <Link
                    href="/terms"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/about"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={styles.signupBtn}
                >
                  Sign Up / Login
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link
                      href="/login"
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign Up
                    </Link>
                 
                  <Link
                    href="/terms"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/about"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Desktop dropdown (outside nav links) */}
        <div className={`${styles.desktopOnly} relative`} ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={styles.signupBtn}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Hi, {userName}
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    href={dashboardPath}
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles.dropdownItem}
                  >
                    Logout
                  </button>
                  
                  <Link
                    href="/terms"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/about"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={styles.signupBtn}
              >
                Sign Up / Login
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    href="/login"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Sign Up
                  </Link>
              
                  <Link
                    href="/terms"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/about"
                    className={styles.dropdownItem}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
