"use client";

import { motion } from "framer-motion";

export type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  year: string;
  description: string;
};

// Ready to be filled with data later
const experienceData: ExperienceItem[] = [];

export default function Experience({ direction = "center" }: { direction?: string }) {
  
  const getInitial = () => {
    switch(direction) {
      case "bottom-left": return { opacity: 0, x: -800, y: 800 };
      case "center": return { opacity: 0, scale: 0.2 };
      case "top-right": return { opacity: 0, x: 800, y: -800 };
      default: return { opacity: 0, x: 100, skewX: -5 };
    }
  };

  return (
    <div className="w-full px-6 sm:px-16 lg:px-32 relative z-10 flex flex-col items-center">
      
      {/* Section Title */}
      <div className="relative inline-block mb-20 ml-4 self-start">
        <div 
          className="absolute inset-0 bg-[var(--red)] transform -skew-x-12 -rotate-2 z-0"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)' }}
        />
        <h2 
          className="relative z-10 text-6xl sm:text-8xl uppercase tracking-wider px-8 py-2 text-[var(--white)] drop-shadow-md p5-heading"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          EXPERIENCE
        </h2>
      </div>

      <div className="max-w-5xl w-full relative pl-8 sm:pl-16">
        
        {/* Continuous red timeline line down the left side */}
        <div className="absolute left-[10px] sm:left-[20px] top-0 bottom-0 w-[6px] bg-[var(--red)] z-0" />
        
        {experienceData.length === 0 ? (
          <div className="py-12 pl-8">
            <p 
              className="text-3xl text-gray-500 uppercase tracking-widest opacity-60"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              Experience coming soon...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
            {experienceData.map((item, index) => (
              <div key={item.id} className="flex flex-col relative pl-8 sm:pl-12">
                
                {/* Timeline Node */}
                <div className="absolute left-[-22px] sm:left-[-32px] top-[20px] w-[24px] h-[24px] bg-[var(--black)] border-[6px] border-[var(--white)] rotate-45 z-10" />

                <motion.div 
                  initial={getInitial()}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1, skewX: 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-[var(--black)] p-6 sm:p-10 relative border-[6px] border-[var(--red)] group"
                  style={{ 
                    clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 
                      className="text-4xl sm:text-5xl text-[var(--white)] uppercase tracking-wide" 
                      style={{ fontFamily: 'var(--font-bebas-neue)' }}
                    >
                      {item.role}
                    </h3>
                    <span 
                      className="text-3xl text-[var(--red)] uppercase tracking-wider mt-2 sm:mt-0" 
                      style={{ fontFamily: 'var(--font-bangers)' }}
                    >
                      {item.year}
                    </span>
                  </div>
                  
                  <h4 
                    className="text-2xl sm:text-3xl text-[var(--gold)] uppercase tracking-wide mb-4" 
                    style={{ fontFamily: 'var(--font-bebas-neue)' }}
                  >
                    {item.company}
                  </h4>
                  <p 
                    className="text-xl text-gray-300 leading-relaxed max-w-2xl" 
                    style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 500 }}
                  >
                    {item.description}
                  </p>

                  {/* Decorative background slash on hover */}
                  <div className="absolute top-0 right-[-50px] w-[150px] h-full bg-[var(--red)] opacity-10 transform skew-x-[-30deg] pointer-events-none group-hover:bg-[var(--white)] transition-colors duration-300" />
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
