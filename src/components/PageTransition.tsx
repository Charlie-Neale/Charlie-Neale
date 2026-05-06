"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full h-full">
        
        {/* The Sweeping Red Panel */}
        <motion.div
          initial={{ left: "-150vw" }}
          animate={{ left: "150vw" }}
          exit={{ left: "-150vw" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // smooth, aggressive easing
          className="fixed top-0 bottom-0 w-[120vw] bg-[var(--red)] z-[9999] pointer-events-none drop-shadow-2xl"
          style={{ 
            clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
          }}
        />

        {/* Content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {children}
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
