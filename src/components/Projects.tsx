"use client";

import { motion } from "framer-motion";
import { useFlash } from "./FlashProvider";
import projectsData from "../../content/projects.json";

export default function Projects({ direction = "bottom-left" }: { direction?: string }) {
  const { triggerFlash } = useFlash();

  const getInitial = () => {
    switch(direction) {
      case "bottom-left": return { opacity: 0, x: -800, y: 800 };
      case "center": return { opacity: 0, scale: 0.2 };
      case "top-right": return { opacity: 0, x: 800, y: -800 };
      default: return { opacity: 0, y: 50 };
    }
  };

  return (
    <div className="w-full px-6 sm:px-16 lg:px-32 relative z-10 flex flex-col">
      
      {/* Remove centered container, let cards sit dynamically */}
      <div className="flex flex-col gap-12 self-start w-full mt-4">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title || index}
            initial={getInitial()}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
            whileHover={{ 
              scale: 1.02,
              x: 10,
              boxShadow: "0px 25px 50px rgba(255, 0, 0, 0.35)"
            }}
            className="group relative overflow-hidden flex flex-col w-full max-w-4xl"
            style={{
              marginLeft: `${index * 40}px`, // staggered layout
              backgroundColor: 'var(--black)',
              border: '6px solid var(--red)',
              clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' // P5 parallelogram
            }}
          >
            {/* Header Image */}
            {project.image && (
              <div className="w-full h-64 sm:h-[400px] overflow-hidden relative border-b-[6px] border-[var(--red)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[var(--red)] opacity-20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            )}

            <div className="relative z-10 p-8 sm:p-12 flex flex-col flex-grow items-center text-center">
              <h3 
                className="text-5xl sm:text-6xl text-[var(--white)] mb-4 tracking-wide uppercase drop-shadow-lg"
                style={{ fontFamily: 'var(--font-bebas-neue)' }}
              >
                {project.title}
              </h3>
              
              <p 
                className="text-2xl sm:text-3xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 500 }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {project.tech?.map(tech => (
                  <div 
                    key={tech} 
                    className="px-5 py-2 uppercase bg-[var(--white)] text-[var(--black)] transform -skew-x-12"
                  >
                    <span 
                      className="block transform skew-x-12 text-xl font-bold"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {tech}
                    </span>
                  </div>
                ))}
              </div>

              {project.link && (
                <div className="mt-auto">
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => triggerFlash()}
                    whileTap={{ scale: 1.05 }}
                    className="bg-[var(--red)] text-[var(--white)] text-4xl uppercase px-12 py-4 relative group/btn flex items-center gap-4 overflow-hidden"
                    style={{ 
                      fontFamily: 'var(--font-bangers)',
                      clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                    }}
                  >
                    <span className="relative z-10 drop-shadow-md tracking-wider">VIEW REPO</span>
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
