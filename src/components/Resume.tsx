"use client";

import { motion } from "framer-motion";
import resumeData from "../content/resume.json";

export default function Resume() {
  return (
    <section id="about" className="w-full py-24 px-6 sm:px-16 lg:px-32 relative z-10 overflow-hidden">
      
      {/* Section Title */}
      <div className="relative inline-block mb-20 ml-4">
        <div 
          className="absolute inset-0 bg-[var(--red)] transform -skew-x-12 -rotate-2 z-0"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 95% 100%, 5% 90%)' }}
        />
        <h2 
          className="relative z-10 text-6xl sm:text-7xl uppercase tracking-wider px-8 py-3 text-[var(--white)] drop-shadow-md"
          style={{ fontFamily: 'var(--font-bangers)' }}
        >
          My Stats
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">
        
        {/* Continuous red timeline line for desktop */}
        <div className="hidden sm:block absolute left-[25%] top-[30px] bottom-[30px] w-[8px] bg-[var(--red)] z-0 ml-[20px]" />
        
        <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
          {resumeData.map((item, index) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0">
              
              {/* Left Column: Date */}
              <div className="sm:w-1/4 sm:pr-8 flex sm:justify-end items-start pt-3">
                <span 
                  className="text-4xl sm:text-5xl text-[var(--red)] uppercase drop-shadow-sm" 
                  style={{ fontFamily: 'var(--font-bangers)' }}
                >
                  {item.year}
                </span>
              </div>

              {/* Middle Column: Timeline Node */}
              <div className="hidden sm:flex justify-center w-12 flex-shrink-0 pt-4 relative">
                <div className="w-[24px] h-[24px] bg-[var(--black)] border-[6px] border-[var(--white)] rotate-45 z-10" />
              </div>

              {/* Right Column: Content */}
              <div className="sm:w-3/4 sm:pl-8 pb-2 overflow-hidden sm:overflow-visible">
                <motion.div 
                  initial={{ x: 250, opacity: 0, skewX: -10 }}
                  whileInView={{ x: 0, opacity: 1, skewX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
                  className="bg-[var(--black)] p-6 sm:p-8 relative border-t-[8px] border-l-[8px] border-[var(--red)] group"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)',
                    borderRight: '1px solid #333',
                    borderBottom: '1px solid #333',
                  }}
                >
                  <h3 
                    className="text-4xl sm:text-5xl text-[var(--white)] uppercase tracking-wide mb-1" 
                    style={{ fontFamily: 'var(--font-bebas-neue)' }}
                  >
                    {item.role}
                  </h3>
                  <h4 
                    className="text-2xl sm:text-3xl text-[var(--gold)] uppercase tracking-wide mb-4" 
                    style={{ fontFamily: 'var(--font-bebas-neue)' }}
                  >
                    {item.company}
                  </h4>
                  <p 
                    className="text-xl text-gray-300 leading-relaxed" 
                    style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 500 }}
                  >
                    {item.description}
                  </p>

                  {/* Decorative background slash */}
                  <div className="absolute top-0 right-[-50px] w-[150px] h-full bg-[var(--red)] opacity-10 transform skew-x-[-30deg] pointer-events-none group-hover:bg-[var(--white)] transition-colors duration-300" />
                </motion.div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
