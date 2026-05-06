"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-16 lg:px-32 bg-[var(--black)] text-[var(--white)] overflow-hidden">
      
      {/* Background halftone texture explicitly for this section */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />

      <div className="relative z-10 max-w-5xl mt-[-10vh]">
        <motion.h1
          initial={{ y: -150, opacity: 0, rotate: -5 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
          className="text-7xl sm:text-8xl md:text-[10rem] uppercase leading-none pl-6 sm:pl-10 border-l-[16px] sm:border-l-[24px]"
          style={{ 
            fontFamily: 'var(--font-bebas-neue)',
            borderColor: 'var(--red)',
            textShadow: '8px 8px 0px var(--red), 14px 14px 0px rgba(0,0,0,0.8)'
          }}
        >
          Charlie Neale
        </motion.h1>

        <motion.div
          initial={{ x: -200, opacity: 0, skewX: -20 }}
          animate={{ x: 0, opacity: 1, skewX: -10 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
          className="mt-8 ml-6 sm:ml-10 inline-block px-6 py-2 rotate-[-3deg]"
          style={{ backgroundColor: 'var(--white)' }}
        >
          <h2
            className="text-4xl sm:text-6xl tracking-widest uppercase m-0"
            style={{ 
              fontFamily: 'var(--font-bangers)',
              color: 'var(--red)'
            }}
          >
            Software Developer
          </h2>
        </motion.div>
      </div>

      {/* Jagged diagonal slash divider at bottom */}
      <div 
        className="absolute bottom-[-2px] left-0 w-full h-24 sm:h-40 z-20 pointer-events-none"
        style={{
          backgroundColor: 'var(--red)',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 20%, 85% 60%, 75% 10%, 65% 80%, 50% 0%, 35% 90%, 25% 30%, 15% 100%, 0 40%)'
        }}
      />
      {/* Secondary gold accent slash underneath */}
      <div 
        className="absolute bottom-[-2px] left-0 w-full h-28 sm:h-48 z-10 pointer-events-none"
        style={{
          backgroundColor: 'var(--gold)',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 82% 70%, 72% 20%, 62% 90%, 48% 10%, 32% 100%, 22% 40%, 12% 110%, 0 50%)'
        }}
      />
    </section>
  );
}
