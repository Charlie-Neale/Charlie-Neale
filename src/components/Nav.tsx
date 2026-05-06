"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", path: "#about" },
  { name: "Work", path: "#work" },
  { name: "Contact", path: "#contact" },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="sticky top-0 z-50 w-full px-6 sm:px-12 py-4 flex justify-between items-center"
      style={{
        backgroundColor: "var(--black)",
        borderBottom: "8px solid var(--red)"
      }}
    >
      {/* Site Logo */}
      <Link 
        href="/" 
        className="text-4xl sm:text-5xl uppercase tracking-wider relative group"
        style={{ 
          fontFamily: "var(--font-bangers)", 
          color: "var(--red)",
        }}
      >
        <span className="relative z-10 group-hover:text-[var(--white)] transition-colors duration-300">
          Charlie Neale
        </span>
      </Link>
      
      {/* Nav Links */}
      <div className="flex gap-8 sm:gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className="relative group text-3xl sm:text-4xl uppercase overflow-visible"
            style={{ 
              fontFamily: "var(--font-bebas-neue)",
              color: "var(--white)"
            }}
          >
            <span className="relative z-10 group-hover:text-[var(--red)] transition-colors duration-200">
              {link.name}
            </span>
            {/* Slash underline animation */}
            <span 
              className="absolute bottom-[-4px] left-[-10px] w-[calc(100%+20px)] h-[6px] bg-[var(--red)] -skew-x-[30deg] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" 
            />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
