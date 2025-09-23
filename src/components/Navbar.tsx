// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);


//   const links = [
//     { name: "About Us", href: "/about" },
//     { name: "Contact", href: "/contact" },
//     { name: "Privacy Policy", href: "/privacy" },
//     { name: "Terms & Conditions", href: "/terms" },
//   ];

//   return (
//     <header className="bg-[#F7F7F7] shadow">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-black">
//         {/* Logo */}
//         <Link href="/">
//           <Image src="/logo.png" alt="Klickshare Logo" width={80} height={70} />
//         </Link>

//         {/* Mobile menu button */}
//         <button
//           className="lg:hidden text-black focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {menuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>

//         {/* Nav Links */}
//         <div
//           className={`${menuOpen ? "flex" : "hidden"
//             } flex-col lg:flex-row lg:flex lg:items-center gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#D5E6EE] lg:bg-transparent px-6 py-4 lg:p-0 z-50 shadow-lg lg:shadow-none`}
//         >
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className={`hover:text-blue-600 block ${pathname === link.href ? "text-blue-600 font-semibold" : ""
//                 }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         <div>
//           <Link
//             href="/signup"
//             onClick={() => setMenuOpen(false)}
//             className="mt-2 lg:mt-0 px-4 py-4 border-2 bg-[#F7F7F7] text-[#1F6563] border-[#1F6563] hover:bg-[#1F6563] hover:text-[#F7F7F7] rounded-full shadow-3xl shadow-[8px_8px_0px_rgba(31,101,99,100)] "
//           >
//             Sign Up / Login
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }



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
        <Link href="/">
          <Image src="/logo.png" alt="Klickshare Logo" width={80} height={70} />
        </Link>

        {/* Mobile menu button */}
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
        </div>

        <div>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className={styles.signupBtn}
          >
            Sign Up / Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

