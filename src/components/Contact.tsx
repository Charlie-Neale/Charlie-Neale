"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [isFlashing, setIsFlashing] = useState(false);
  const buttonControls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger screen flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    // Trigger button shake
    await buttonControls.start({
      x: [-15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    });
  };

  return (
    <section id="contact" className="w-full py-24 px-6 sm:px-16 lg:px-32 relative z-10 overflow-hidden">
      
      {/* Screen flash effect */}
      {isFlashing && (
        <motion.div 
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-[100] pointer-events-none mix-blend-exclusion"
        />
      )}

      {/* Section Title */}
      <div className="relative inline-block mb-16 ml-4">
        <div 
          className="absolute inset-0 bg-[var(--red)] transform -skew-x-12 -rotate-2 z-0"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)' }}
        />
        <h2 
          className="relative z-10 text-6xl sm:text-7xl uppercase tracking-wider px-8 py-3 text-[var(--white)] drop-shadow-md"
          style={{ fontFamily: 'var(--font-bangers)' }}
        >
          Calling Card
        </h2>
      </div>

      {/* Contact Form / Dialogue Box */}
      <div className="max-w-4xl mx-auto relative mt-10">
        
        {/* Decorative gold star/asterisk */}
        <div 
          className="absolute -top-12 -left-8 sm:-left-16 text-8xl sm:text-[180px] text-[var(--gold)] z-20 pointer-events-none drop-shadow-lg"
          style={{ fontFamily: 'var(--font-bangers)', lineHeight: 0.5, transform: 'rotate(15deg)' }}
        >
          *
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[var(--black)] p-8 sm:p-12 relative border-[4px] border-[var(--white)] drop-shadow-2xl"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}
        >
          {/* Subtle inner border for P5 dialogue box look */}
          <div 
            className="absolute inset-2 border-[2px] border-[var(--white)] pointer-events-none opacity-30" 
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)' }} 
          />

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10 mt-6 pl-4 sm:pl-8">
            
            <div className="flex flex-col gap-1">
              <label 
                htmlFor="name" 
                className="text-4xl text-[var(--red)] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-bangers)' }}
              >
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                required
                className="bg-[var(--black)] border-b-[6px] border-[var(--red)] text-[var(--white)] text-3xl p-2 outline-none focus:border-[var(--gold)] transition-colors w-full sm:w-2/3"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label 
                htmlFor="email" 
                className="text-4xl text-[var(--red)] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-bangers)' }}
              >
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                required
                className="bg-[var(--black)] border-b-[6px] border-[var(--red)] text-[var(--white)] text-3xl p-2 outline-none focus:border-[var(--gold)] transition-colors w-full sm:w-2/3"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label 
                htmlFor="message" 
                className="text-4xl text-[var(--red)] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-bangers)' }}
              >
                Message
              </label>
              <textarea 
                id="message" 
                rows={4}
                required
                className="bg-[var(--black)] border-b-[6px] border-[var(--red)] text-[var(--white)] text-3xl p-2 outline-none focus:border-[var(--gold)] transition-colors resize-none w-full"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
              />
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                type="submit"
                animate={buttonControls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--red)] text-[var(--white)] text-5xl sm:text-6xl uppercase px-16 py-4 relative group"
                style={{ 
                  fontFamily: 'var(--font-bebas-neue)',
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 25%, calc(100% - 20px) 50%, 100% 75%, calc(100% - 15px) 100%, 0 100%)',
                }}
              >
                <span className="relative z-10 drop-shadow-md tracking-wider">Send</span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>

    </section>
  );
}
