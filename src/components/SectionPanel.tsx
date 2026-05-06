"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SectionType } from "./ZoomNav";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";

export default function SectionPanel({ section, onBack }: { section: SectionType, onBack: () => void }) {
  const [isZoomComplete, setIsZoomComplete] = useState(false);

  useEffect(() => {
    // Wait for the 400ms zoom animation to finish before mounting content
    // so that the content's entry animations stagger AFTER the zoom.
    const timer = setTimeout(() => setIsZoomComplete(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (section) {
      case "projects": return <Projects direction="bottom-left" />;
      case "experience": return <Experience direction="center" />;
      case "contact": return <Contact direction="top-right" />;
      default: return null;
    }
  };

  const sectionName = section?.toUpperCase() || "";

  return (
    <div className="relative w-full h-full bg-[var(--black)] overflow-hidden flex flex-col">
      
      {/* Background Halftone Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 0, 0, 0.18) 2px, transparent 2px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Fixed Header */}
      <div className="absolute top-0 left-0 w-full h-32 z-50 pointer-events-none flex items-start justify-between px-6 sm:px-12 pt-8">
        
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="pointer-events-auto bg-[var(--red)] text-[var(--white)] text-3xl sm:text-4xl uppercase px-8 py-3 relative group drop-shadow-xl"
          style={{ 
            fontFamily: 'var(--font-bangers)',
            clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)'
          }}
        >
          <span className="relative z-10 tracking-widest">&lt; BACK</span>
          <div className="absolute inset-0 bg-[var(--white)] opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.button>

        {/* Section Title with Parallelogram */}
        <motion.div 
          initial={{ opacity: 0, x: '100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
          className="relative inline-block pointer-events-none mt-2"
        >
          {/* Diagonal Slash Background */}
          <div 
            className="absolute inset-0 bg-[var(--red)] opacity-10"
            style={{ 
              clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)',
              transform: 'scale(1.4) skewX(-15deg)' 
            }}
          />
          {/* Section Name */}
          <h2 
            className="relative z-10 text-[80px] uppercase leading-none drop-shadow-lg pr-4"
            style={{ fontFamily: 'var(--font-bebas-neue)', color: 'var(--red)' }}
          >
            {sectionName}
          </h2>
        </motion.div>

      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full h-full overflow-y-auto overflow-x-hidden p5-scrollbar pt-40 pb-12">
        {isZoomComplete && renderContent()}
      </div>

    </div>
  );
}
