"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeMap from "./HomeMap";
import SectionPanel from "./SectionPanel";

export type SectionType = "projects" | "experience" | "contact" | null;

export default function ZoomNav() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);

  // ─── Refs written synchronously on click, before any React state update ───
  // This guarantees the animation always reads the correct values,
  // regardless of React's render batching.
  const [isZooming, setIsZooming] = useState(false);
  const targetSectionRef = useRef<SectionType>(null);
  const zoomOriginRef = useRef({ x: "50%", y: "50%" });

  const navigateTo = (section: SectionType, x?: number, y?: number) => {
    if (section === null) {
      // Back navigation — no zoom needed, update state immediately
      setActiveSection(null);
      return;
    }

    // STEP 1: Write target section and origin to refs SYNCHRONOUSLY
    //         before any state update or animation starts
    targetSectionRef.current = section;
    if (x !== undefined && y !== undefined) {
      zoomOriginRef.current = { x: `${x}px`, y: `${y}px` };
    }

    // STEP 2: Trigger zoom animation via state. HomeMap still rendered
    //         (activeSection is still null), but now animates to scale 8.
    setIsZooming(true);
  };

  const handleZoomComplete = () => {
    if (!isZooming) return; // guard against idle animation completion events
    // STEP 3: Zoom finished — NOW commit the section change to state
    setActiveSection(targetSectionRef.current);
    setIsZooming(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--black)]">

      <AnimatePresence>
        {activeSection === null && (
          <motion.div
            key="homemap"
            initial={{ scale: 1, opacity: 1 }}
            // Drive the zoom via isZooming state, not via exit
            animate={isZooming
              ? { scale: 8, opacity: 0 }
              : { scale: 1, opacity: 1 }
            }
            // Once unmounted after setActiveSection fires, sit at zoom state
            exit={{ scale: 8, opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.6, ease: [0.4, 0, 1, 1] }}
            // transformOrigin read from ref — always the freshest value
            style={{ transformOrigin: `${zoomOriginRef.current.x} ${zoomOriginRef.current.y}` }}
            onAnimationComplete={handleZoomComplete}
            className="absolute inset-0 w-full h-full z-10"
          >
            <HomeMap onNavigate={navigateTo} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSection !== null && (
          <motion.div
            key="sectionpanel"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-20"
          >
            <SectionPanel section={activeSection} onBack={() => navigateTo(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
