"use client";

import { motion } from "framer-motion";
import { useFlash } from "./FlashProvider";
import projectsData from "../../content/projects.json";

const TECH_ROTATIONS: Record<string, number> = {
  Python: -3,
  "Scikit-Learn": 2,
  Pandas: -1,
  TypeScript: 3,
  React: -2,
  "Next.js": 1,
  Tailwind: -3,
  JavaScript: 2,
};

export default function Projects({ direction = "bottom-left" }: { direction?: string }) {
  const { triggerFlash } = useFlash();

  const getInitial = () => {
    switch (direction) {
      case "bottom-left": return { opacity: 0, x: -800, y: 800 };
      case "center":      return { opacity: 0, scale: 0.2 };
      case "top-right":   return { opacity: 0, x: 800, y: -800 };
      default:            return { opacity: 0, y: 50 };
    }
  };

  return (
    <div className="w-full px-6 sm:px-16 lg:px-32 relative z-10 flex flex-col">
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
              marginLeft: `${index * 40}px`,
              backgroundColor: 'var(--black)',
              border: '6px solid var(--red)',
              clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)',
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

              {/* Title — Oswald 800 with hard red text-shadow */}
              <h3
                style={{
                  fontFamily: 'var(--font-oswald)',
                  fontWeight: 800,
                  fontSize: '28px',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textShadow: '3px 3px 0px #FF0000',
                  marginBottom: '16px',
                }}
              >
                {project.title}
              </h3>

              <p
                className="text-2xl sm:text-3xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 500 }}
              >
                {project.description}
              </p>

              {/* Tech tags — per-tag rotated stickers */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {project.tech?.map((tech, ti) => {
                  const rot = TECH_ROTATIONS[tech] ?? ((ti % 2 === 0 ? -1 : 1) * ((ti % 3) + 1));
                  return (
                    <div
                      key={tech}
                      style={{
                        background: '#000',
                        border: '2px solid #FF0000',
                        transform: `rotate(${rot}deg)`,
                        padding: '4px 10px',
                        display: 'inline-block',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-oswald)',
                          fontWeight: 600,
                          fontSize: '11px',
                          color: '#FFF',
                          textTransform: 'uppercase',
                          letterSpacing: '1.5px',
                          display: 'block',
                          transform: `rotate(${-rot}deg)`,
                        }}
                      >
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* VIEW REPO — P5 action button: black bg, red border */}
              {project.link && (
                <div className="mt-auto">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerFlash()}
                    whileHover={{ x: -4, scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group/btn inline-block"
                    style={{
                      background: '#000',
                      border: '3px solid #FF0000',
                      clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                      padding: '12px 48px',
                      boxShadow: '4px 4px 0px #FF0000',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-oswald)',
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#FFF',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        textShadow: '2px 2px 0px #FF0000',
                        display: 'block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      VIEW REPO
                    </span>
                    <div className="absolute inset-0 bg-[var(--red)] opacity-0 group-hover/btn:opacity-10 transition-opacity" />
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
