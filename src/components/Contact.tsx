"use client";

import { motion, useAnimation } from "framer-motion";
import { useFlash } from "./FlashProvider";

export default function Contact({ direction = "top-right" }: { direction?: string }) {
  const { triggerFlash } = useFlash();
  const buttonControls = useAnimation();

  const getInitial = () => {
    switch(direction) {
      case "bottom-left": return { opacity: 0, x: -800, y: 800 };
      case "center": return { opacity: 0, scale: 0.2 };
      case "top-right": return { opacity: 0, x: 800, y: -800 };
      default: return { opacity: 0, y: 50 };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerFlash();
    await buttonControls.start({
      x: [-15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    });
  };

  return (
    <div className="w-full px-6 sm:px-16 lg:px-32 relative z-10 overflow-hidden flex flex-col items-center">
      
      {/* Section Title */}
      <div className="relative inline-block mb-16 ml-4 self-start">
        <div 
          className="absolute inset-0 bg-[var(--red)] transform -skew-x-12 -rotate-2 z-0"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)' }}
        />
        <h2 
          className="relative z-10 text-6xl sm:text-7xl uppercase tracking-wider px-8 py-3 text-[var(--white)] drop-shadow-md"
          style={{ fontFamily: 'var(--font-bangers)' }}
        >
          Contact
        </h2>
      </div>

      {/* Contact Form / Dialogue Box */}
      <div className="w-full max-w-4xl relative mt-10">
        
        {/* Decorative gold star/asterisk */}
        <div 
          className="absolute -top-12 -left-8 sm:-left-16 text-8xl sm:text-[180px] text-[var(--gold)] z-20 pointer-events-none drop-shadow-lg"
          style={{ fontFamily: 'var(--font-bangers)', lineHeight: 0.5, transform: 'rotate(15deg)' }}
        >
          *
        </div>

        <motion.div 
          initial={getInitial()}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
          className="bg-[var(--black)] p-8 sm:p-12 relative border-[6px] border-[var(--red)] drop-shadow-2xl w-full"
          style={{ 
            clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' 
          }}
        >
          {/* Subtle inner border for P5 dialogue box look */}
          <div 
            className="absolute inset-2 border-[2px] border-[var(--red)] pointer-events-none opacity-50" 
            style={{ 
              clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' 
            }} 
          />

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10 mt-6 pl-4 sm:pl-8">
            
            {/* Header info instead of inputs */}
            <div className="flex flex-col gap-4">
              <div className="relative inline-block self-start">
                <div className="absolute bottom-2 left-[-10px] w-[110%] h-[16px] bg-[var(--red)] transform -skew-x-12 z-0 opacity-90" />
                <h3 
                  className="text-6xl sm:text-7xl text-[var(--white)] uppercase tracking-wide relative z-10"
                  style={{ fontFamily: 'var(--font-bebas-neue)' }}
                >
                  Charlie Neale
                </h3>
              </div>
              
              <a 
                href="mailto:charliefneale@outlook.com"
                className="text-3xl sm:text-4xl text-[var(--gold)] tracking-widest relative group inline-block self-start"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
              >
                charliefneale@outlook.com
                <span className="absolute bottom-[-4px] left-0 w-0 h-[4px] bg-[var(--gold)] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <div className="flex flex-col gap-1 mt-4">
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
                placeholder="What's your request?"
                className="bg-[var(--black)] border-b-[6px] border-[var(--red)] text-[var(--white)] text-3xl p-2 outline-none focus:border-[var(--gold)] transition-colors resize-none w-full placeholder:text-gray-600"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
              />
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                type="submit"
                animate={buttonControls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                className="bg-[var(--red)] text-[var(--white)] text-4xl sm:text-5xl uppercase px-12 py-4 relative group"
                style={{ 
                  fontFamily: 'var(--font-bebas-neue)',
                  clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                }}
              >
                <span className="relative z-10 drop-shadow-md tracking-wider">SEND MESSAGE</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </div>

          </form>
        </motion.div>
      </div>

    </div>
  );
}
