"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FlashContextType = {
  triggerFlash: () => void;
};

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export function useFlash() {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
}

export default function FlashProvider({ children }: { children: ReactNode }) {
  const [isFlashing, setIsFlashing] = useState(false);

  const triggerFlash = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
  };

  return (
    <FlashContext.Provider value={{ triggerFlash }}>
      {children}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-[var(--red)] z-[9999] pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </FlashContext.Provider>
  );
}
