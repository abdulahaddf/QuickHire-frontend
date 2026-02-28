"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  // Mobile menu animation variants
  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      x: "100%"
    },
    visible: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: "100%"
    }
  };

  // Hamburger icon animation variants
  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1
    },
    open: {
      rotate: 0,
      scale: 1.1
    }
  };

  return (
    <>
    <nav className="flex items-center justify-between py-6 px-6 lg:px-20 mx-auto w-full z-50 relative bg-[#FAFBFF]">
      <div className="flex items-center gap-12 md:px-20">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="relative w-8 h-8">
            <Image src="/logo.svg" alt="QuickHire Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">QuickHire</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 font-medium text-gray-600 text-[15px]">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link href="/#" className="hover:text-primary transition-colors">
            Browse Companies
          </Link>
        </div>
      </div>

      {/* Desktop actions */}
      <div className="hidden lg:flex items-center gap-2 md:gap-4">
        <Link href="/login">
          <Button variant="ghost" className="px-4 text-primary font-bold">
            Login
          </Button>
        </Link>
        <span className="w-[1px] h-6 bg-gray-200" />
        <Link href="/signup">
          <Button variant="primary" className="rounded-sm bg-[#4F46E5] hover:bg-[#4338CA] px-6">
            Sign Up
          </Button>
        </Link>
      </div>

      {/* Mobile: hamburger button */}
      <motion.button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="lg:hidden p-2 text-gray-700"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        variants={hamburgerVariants}
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: menuOpen ? 0 : 1, rotate: menuOpen ? -90 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute"
        >
          <Menu className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: menuOpen ? 1 : 0, rotate: menuOpen ? 0 : 90 }}
          transition={{ duration: 0.15 }}
          className="absolute"
        >
          <X className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </nav>

    {/* Mobile menu overlay */}
    <AnimatePresence mode="wait">
      {menuOpen && (
        <motion.div
          className="fixed inset-0 top-[73px] z-40 lg:hidden bg-white border-t border-gray-100 shadow-lg"
          aria-hidden="false"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <div className="flex flex-col py-6 px-6 gap-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Link
                href="/jobs"
                className="block py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                Find Jobs
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <Link
                href="/#"
                className="block py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                Browse Companies
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="h-px bg-gray-200 my-2" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              <Link
                href="/login"
                className="block py-3 px-4 text-[#4F46E5] font-semibold"
                onClick={closeMenu}
              >
                Login
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Link
                href="/signup"
                className="mx-4 mt-2 block"
                onClick={closeMenu}
              >
                <Button variant="primary" className="w-full rounded-sm bg-[#4F46E5] hover:bg-[#4338CA] py-3">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
