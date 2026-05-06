"use client";

import { motion } from "framer-motion";
import projectsData from "../../content/projects.json";

export default function Projects() {
  return (
    <section id="work" className="w-full py-24 px-6 sm:px-16 lg:px-32 relative z-10">
      
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
          Featured Work
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title || index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ rotate: -3, scale: 1.05 }}
            className="group relative overflow-hidden flex flex-col p-8 cursor-pointer"
            style={{
              backgroundColor: 'var(--black)',
              borderTop: '8px solid var(--red)',
              borderRight: '1px solid #333',
              borderBottom: '1px solid #333',
              borderLeft: '1px solid #333',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 15px) calc(100% - 15px), calc(100% - 30px) 100%, 0 100%)'
            }}
          >
            {/* Red streak effect on hover */}
            <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-[var(--red)] to-transparent opacity-60 transform -skew-x-[45deg] group-hover:left-[200%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
              <h3 
                className="text-4xl text-[var(--white)] mb-4 tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-bebas-neue)' }}
              >
                {project.title}
              </h3>
              
              <p 
                className="text-2xl text-gray-300 mb-8 leading-relaxed"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 500 }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map(tech => (
                  <div 
                    key={tech} 
                    className="px-4 py-1 uppercase bg-[var(--white)] text-[var(--black)] transform -skew-x-12"
                  >
                    <span 
                      className="block transform skew-x-12 text-lg font-bold"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {tech}
                    </span>
                  </div>
                ))}
              </div>

              {project.link && (
                <div className="mt-6 flex justify-end">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--gold)] text-2xl uppercase tracking-wider hover:text-[var(--white)] transition-colors relative z-20"
                    style={{ fontFamily: 'var(--font-bangers)' }}
                  >
                    View Project &gt;
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
