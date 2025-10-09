"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/sidebar.module.css";

interface SidebarProps {
  title: string;
  links: { name: string; path: string; icon?: React.ReactNode }[];
}

export default function Sidebar({ title, links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>{title}</h2>
      <nav className={styles.nav}>
        {links.map((link) => {
          const active = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.link} ${active ? styles.active : ""}`}
            >
              <div className={styles.row}>
                {link.icon ? (
                  <span className={styles.icon}>{link.icon}</span>
                ) : (
                  <span className={styles.circle} />
                )}
                <span className={styles.linkText}>{link.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
