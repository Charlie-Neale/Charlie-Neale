"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SectionType } from "./ZoomNav";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { LetterLabel, PROJECTS_PANEL, EXPERIENCE_PANEL, CONTACT_PANEL } from "./LetterLabel";

const PANEL_CONFIGS = {
  projects: PROJECTS_PANEL,
  experience: EXPERIENCE_PANEL,
  contact: CONTACT_PANEL,
} as const;

export default function SectionPanel({ section, onBack }: { section: SectionType, onBack: () => void }) {
  const [isZoomComplete, setIsZoomComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsZoomComplete(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (section) {
      case "projects": return <Projects direction="bottom-left" />;
      case "experience": return <Experience direction="bottom-left" />;
      case "contact": return <Contact direction="top-right" />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-full bg-[var(--black)] overflow-hidden flex flex-col">

      {/* Background Halftone Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 0, 0, 0.35) 2px, transparent 2px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Fixed Header */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none flex items-start justify-between px-6 sm:px-10 pt-6">

        {/* Back Button — P5 parallelogram action button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4, scale: 1.04 }}
          whileTap={{ scale: 0.93 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
          className="pointer-events-auto relative group"
          style={{
            background: '#FF0000',
            clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)',
            padding: '10px 40px 10px 32px',
            boxShadow: '4px 4px 0px #000',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-oswald)',
              fontWeight: 700,
              fontSize: '22px',
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '3px 3px 0px #000',
              display: 'block',
              whiteSpace: 'nowrap',
            }}
          >
            ← BACK
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
        </motion.button>

        {/* Section Title — per-letter chaos treatment */}
        <motion.div
          initial={{ opacity: 0, x: 200, y: -40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 140, damping: 16 }}
          className="pointer-events-none flex items-center"
          style={{ paddingTop: '4px' }}
        >
          {section && (
            <LetterLabel letterConfigs={PANEL_CONFIGS[section]} />
          )}
        </motion.div>

      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full h-full overflow-y-auto overflow-x-hidden p5-scrollbar pt-40 pb-12">
        {isZoomComplete && renderContent()}
      </div>

    </div>
  );
}
